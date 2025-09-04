"use client";
import { Utensils, ChefHat } from "lucide-react";
import { motion } from "framer-motion";

const ModeToggle = ({ currentMode, onModeChange }) => {
  const baseStyle =
    "flex-1 py-2.5 px-4 rounded-full text-sm font-medium focus:outline-none transition-all duration-300 ease-in-out flex items-center justify-center space-x-2";
  const activeStyle = "bg-orange-500 text-white backdrop-blur-md shadow-md";
  const inactiveStyle = "bg-white/70 text-gray-800 hover:bg-white/90";

  return (
    <motion.div
      className="flex space-x-2 px-2 py-1 rounded-full bg-white/40 backdrop-blur-lg border border-orange-100 mb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      <motion.button
        onClick={() => onModeChange("eatOut")}
        className={`${baseStyle} ${
          currentMode === "eatOut" ? activeStyle : inactiveStyle
        }`}
        aria-pressed={currentMode === "eatOut"}
        whileHover={{ scale: currentMode !== "eatOut" ? 1.04 : 1 }}
        whileTap={{ scale: 0.96 }}
      >
        <Utensils size={18} />
        <span>Eat Out</span>
      </motion.button>
      <motion.button
        onClick={() => onModeChange("cookHome")}
        className={`${baseStyle} ${
          currentMode === "cookHome" ? activeStyle : inactiveStyle
        }`}
        aria-pressed={currentMode === "cookHome"}
        whileHover={{ scale: currentMode !== "cookHome" ? 1.04 : 1 }}
        whileTap={{ scale: 0.96 }}
      >
        <ChefHat size={18} />
        <span>Cook at Home</span>
      </motion.button>
    </motion.div>
  );
};

export default ModeToggle;
