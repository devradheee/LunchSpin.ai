import { NextResponse } from "next/server";

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

export async function POST(req) {
  try {
    const body = await req.json();

    const { prompt, responseSchema } = body;

    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Missing Gemini API key" },
        { status: 500 }
      );
    }

    if (!prompt || !responseSchema) {
      return NextResponse.json(
        { error: "Missing prompt or schema" },
        { status: 400 }
      );
    }

    const geminiRes = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `${prompt} Please reply ONLY with a valid JSON array that matches this schema:\n\n${JSON.stringify(
                  responseSchema,
                  null,
                  2
                )}\n\nDo not include any commentary, notes, or markdown formatting. Just raw JSON.`,
              },
            ],
          },
        ],
      }),
    });

    const json = await geminiRes.json();

    console.log("Raw Gemini response:", JSON.stringify(json, null, 2));

    const rawText = json?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      return NextResponse.json(
        { error: "No response from Gemini" },
        { status: 502 }
      );
    }

    const parsed = safeJsonParse(rawText);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Failed to parse Gemini response", raw: rawText },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: parsed.data });
  } catch (err) {
    const error = err;
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

function safeJsonParse(text) {
  try {
    const cleaned = text
      .replace(/```json/, "")
      .replace(/```/, "")
      .trim();

    return { success: true, data: JSON.parse(cleaned) };
  } catch (e) {
    console.error("Failed to parse JSON:", e);
    return { success: false };
  }
}