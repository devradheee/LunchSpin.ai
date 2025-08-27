import React from "react";
import { ChefHat, Search } from "lucide-react";
import { motion } from "framer-motion";

const CookForm = ({ ingredients, setIngredients, onSubmit, isLoading }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-8 w-full max-w-2xl mt-6 px-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <ChefHat className="w-4 h-4 text-green-600" />
          Ingredients you have
        </label>
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          rows={3}
          placeholder="e.g., pasta, garlic, tomato, onion, cheese..."
          className="w-full px-4 py-2 bg-white/70 backdrop-blur-sm border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <p className="text-xs text-gray-500">
          {"List your main ingredients. We'll suggest recipes you can cook!"}
        </p>
      </div>

      <motion.button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold text-sm rounded-lg hover:bg-green-700 transition-all"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isLoading ? (
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="white"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="white"
              d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z"
            />
          </svg>
        ) : (
          <>
            <Search size={16} />
            <span>Suggest Recipes</span>
          </>
        )}
      </motion.button>
    </motion.form>
  );
};

export default CookForm;
