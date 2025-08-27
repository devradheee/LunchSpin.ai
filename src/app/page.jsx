import { motion } from "framer-motion";
import { ArrowRight, Utensils } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-orange-100 text-gray-800 px-4 relative overflow-hidden">
      {/* Header */}
      <div className="absolute top-6 left-6 flex items-center space-x-2 z-10">
        <Utensils className="w-6 h-6 text-orange-500" />
        <h4 className="text-lg font-semibold text-gray-800">
          LunchSpin<span className="text-orange-500">.ai</span>
        </h4>
      </div>
      <div className="absolute top-6 right-6 z-10">
        <Link
          href="/app"
          className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-xl shadow hover:bg-orange-600 transition-all"
        >
          <span>Get Started</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Hero */}
      <div className="flex flex-col items-center justify-center text-center pt-36 pb-16">
        <motion.h1
          className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          One spin, infinite meals.
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg text-gray-600 max-w-xl mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Get delicious, mood-based food suggestions — whether you're cooking at
          home or eating out.
        </motion.p>

        <motion.div
          className="w-full max-w-4xl mb-8 px-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <motion.div
            className="w-full flex justify-center"
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/food.png"
              alt="Hero lunch spin"
              width={400}
              height={400}
              className="mx-auto"
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-4 flex w-full sm:w-1/2 md:w-1/10 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link
            href="/app"
            className="px-6 py-3 w-full rounded-xl bg-orange-500 text-white font-medium shadow-md hover:bg-orange-600 transition-all duration-300"
          >
            <span className="text-sm flex items-center justify-between">
              Get Started <ArrowRight size={15} />
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        className="text-center mb-6 text-sm text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        © {new Date().getFullYear()} LunchSpin.ai — Crafted with love by{" "}
        <a
          className="underline hover:text-orange-600"
          href="https://radheee.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Radheshyam
        </a>
      </motion.footer>
    </div>
  );
}
