import React from "react";
import {
  MapPin,
  ExternalLink,
  Utensils,
  ListChecks,
  ChefHat,
  Share2,
} from "lucide-react";
import { motion } from "framer-motion";

const SuggestionCard = ({ suggestion, mode, isHighlighted, onShare }) => {
  const googleMapsUrl = suggestion.mapsQuery
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        suggestion.mapsQuery,
      )}`
    : "#";

  const ingredients = suggestion.ingredientsNeeded ?? [];

  return (
    <motion.div
      className={`bg-white/70 backdrop-blur-md border border-gray-200 p-6 rounded-2xl transition-all duration-300 ease-in-out ${
        isHighlighted ? "ring-4 ring-yellow-300" : ""
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
    >
      {mode === "eatOut" ? (
        <>
          <div className="flex items-center mb-3">
            <Utensils className="w-4 h-4 text-orange-500 mr-2" />
            <h4 className="text-lg font-semibold text-gray-800">
              {suggestion.name}
            </h4>
          </div>
          <p className="text-gray-700 text-sm mb-4">{suggestion.commentary}</p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <motion.a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MapPin className="w-4 h-4 mr-2" />
              View on Maps
              <ExternalLink className="w-4 h-4 ml-2 opacity-75" />
            </motion.a>
            <motion.button
              onClick={onShare}
              title="Share suggestion"
              className="flex items-center justify-center px-4 py-2 bg-teal-500 text-white text-sm font-medium rounded-lg hover:bg-teal-600 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </motion.button>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center mb-3">
            <ChefHat className="w-6 h-6 text-green-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">
              {suggestion.recipeName}
            </h3>
          </div>
          <p className="text-gray-700 text-sm mb-4">{suggestion.commentary}</p>

          {ingredients.length > 0 && (
            <div className="mb-3">
              <h4 className="text-xs font-semibold text-gray-700 mb-1 flex items-center">
                <ListChecks className="w-4 h-4 mr-1 text-green-500" />
                Key Ingredients
              </h4>
              <ul className="list-disc list-inside text-xs text-gray-600 space-y-0.5">
                {ingredients.map((ing, idx) => (
                  <li key={idx}>{ing}</li>
                ))}
              </ul>
            </div>
          )}

          {suggestion.basicSteps && (
            <div className="mb-4">
              <h4 className="text-xs font-semibold text-gray-700 mb-1">
                Basic Steps
              </h4>
              <p className="text-xs text-gray-600">{suggestion.basicSteps}</p>
            </div>
          )}

          <motion.button
            onClick={onShare}
            title="Share this recipe"
            className="w-full flex items-center justify-center px-4 py-2 bg-teal-500 text-white text-sm font-medium rounded-lg hover:bg-teal-600 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share Recipe
          </motion.button>
        </>
      )}
    </motion.div>
  );
};

export default SuggestionCard;
