"use client";
import { useState } from "react";
import { Utensils, RotateCw, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import InputForm from "../../components/InputForm";
import CookForm from "../../components/CookForm";
import SuggestionCard from "../../components/SuggestionCard";
import SpinnerWheel from "../../components/SpinnerWheel";
import LoadingIndicator from "../../components/LoadingIndicator";
import ModeToggle from "../../components/ModeToggle";

// ... (rest of the file is the same as provided before)
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export default function HomePage() {
  const [mode, setMode] = useState("eatOut");
  const [location, setLocation] = useState("");
  const [preferences, setPreferences] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [spunSuggestion, setSpunSuggestion] = useState(null);
  const [showSpinnerWheel, setShowSpinnerWheel] = useState(false);

  const fetchSuggestions = async () => {
    setIsLoading(true);
    setError(null);
    setSuggestions([]);
    setSpunSuggestion(null);
    setShowSpinnerWheel(false);

    let prompt = "";
    let responseSchema = {};

    if (mode === "eatOut") {
      prompt = `I'm in ${location}. I'm looking for food that is ${preferences}. Suggest 3 fun dishes with a Google Maps query.`;
      responseSchema = {
        type: "ARRAY",
        maxItems: 3,
        items: {
          type: "OBJECT",
          properties: {
            name: { type: "STRING" },
            commentary: { type: "STRING" },
            mapsQuery: { type: "STRING" },
          },
          required: ["name", "commentary", "mapsQuery"],
        },
      };
    } else {
      prompt = `With these ingredients: ${ingredients}, suggest 3 recipes with commentary, ingredients and steps.`;
      responseSchema = {
        type: "ARRAY",
        maxItems: 3,
        items: {
          type: "OBJECT",
          properties: {
            recipeName: { type: "STRING" },
            commentary: { type: "STRING" },
            ingredientsNeeded: { type: "ARRAY", items: { type: "STRING" } },
            basicSteps: { type: "STRING" },
          },
          required: [
            "recipeName",
            "commentary",
            "ingredientsNeeded",
            "basicSteps",
          ],
        },
      };
    }

    try {
      const response = await fetch("/api/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, responseSchema }),
      });

      if (!response.ok) throw new Error("Failed to fetch suggestions.");

      if (mode === "eatOut") {
        const { data } = await response.json();
        const enriched = data.map((s, index) => ({
          ...s,
          id: `eatOut-${index}-${Date.now()}`,
        }));
        setSuggestions(enriched);
      } else {
        const { data } = await response.json();
        const enriched = data.map((s, index) => ({
          ...s,
          id: `cookHome-${index}-${Date.now()}`,
        }));
        setSuggestions(enriched);
      }
    } catch (err) {
      const error =
        err instanceof Error ? err.message : "Something went wrong.";
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-br from-white via-orange-50 to-orange-100">
      <div className="absolute top-6 left-6 flex items-center space-x-2 z-10">
        <Utensils className="w-6 h-6 text-orange-500" />
        <h4 className="text-lg font-semibold text-gray-800">
          LunchSpin<span className="text-orange-500">.ai</span>
        </h4>
      </div>

      <motion.main
        className="bg-white/90 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-3xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <motion.header className="text-center mb-6">
          <motion.h1
            className="text-2xl sm:text-3xl font-semibold text-gray-800"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {mode === "eatOut"
              ? "What are you craving today?"
              : "What’s in your kitchen?"}
          </motion.h1>
          <p className="text-sm text-gray-500 mt-1">
            Let the AI whip up the perfect meal match.
          </p>
        </motion.header>

        <ModeToggle currentMode={mode} onModeChange={setMode} />

        {mode === "eatOut" ? (
          <InputForm
            {...{
              location,
              setLocation,
              preferences,
              setPreferences,
              onSubmit: fetchSuggestions,
              isLoading,
            }}
          />
        ) : (
          <CookForm
            {...{
              ingredients,
              setIngredients,
              onSubmit: fetchSuggestions,
              isLoading,
            }}
          />
        )}

        <AnimatePresence>{isLoading && <LoadingIndicator />}</AnimatePresence>

        {!isLoading && !error && suggestions.length > 0 && (
          <motion.section
            className="mt-8"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.h3
              className="text-lg font-semibold text-gray-700 mb-4 text-center"
              variants={itemVariants}
            >
              <Sparkles className="inline-block w-5 h-5 text-yellow-500 mr-1" />
              Your delicious suggestions
            </motion.h3>
            <div className="grid gap-4">
              {suggestions.map((s) => (
                <motion.div key={s.id} variants={itemVariants}>
                  <SuggestionCard
                    suggestion={s}
                    mode={mode}
                    isHighlighted={spunSuggestion?.id === s.id}
                    onShare={() => navigator.clipboard.writeText(s.commentary)}
                  />
                </motion.div>
              ))}
            </div>

            {suggestions.length > 1 && (
              <motion.div className="mt-8 text-center" variants={itemVariants}>
                <motion.button
                  onClick={() => setShowSpinnerWheel(true)}
                  className="px-6 py-3 bg-green-500 text-white font-semibold rounded-xl shadow hover:bg-green-600 transition"
                  whileHover={{ scale: 1.05 }}
                >
                  <RotateCw className="inline mr-2 animate-spin-slow" /> Spin
                  the Wheel
                </motion.button>
              </motion.div>
            )}
          </motion.section>
        )}

        {error && (
          <motion.div
            className="mt-6 p-4 bg-red-100 text-red-700 rounded-md shadow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="font-medium">Oops! {error}</p>
          </motion.div>
        )}

        <AnimatePresence>
          {showSpinnerWheel && (
            <SpinnerWheel
              suggestions={suggestions}
              onSpinFinish={(s) => setSpunSuggestion(s)}
              onClose={() => setShowSpinnerWheel(false)}
            />
          )}
        </AnimatePresence>
      </motion.main>

      <motion.footer className="mt-6 text-sm text-gray-500 text-center">
        © {new Date().getFullYear()} LunchSpin.ai — Made with ❤️ by{" "}
        <a
          href="https://radheee.vercel.app/"
          className="underline hover:text-orange-600"
          target="_blank"
          rel="noopener noreferrer"
        >
          Radheshyam
        </a>
      </motion.footer>
    </div>
  );
}
