"use client";
import { useState } from "react";
import { MapPin, Search, Crosshair } from "lucide-react";
import { motion } from "framer-motion";

const InputForm = ({
  location,
  setLocation,
  preferences,
  setPreferences,
  onSubmit,
  isLoading,
}) => {
  const [useLiveLocation, setUseLiveLocation] = useState(false);

  const fetchLiveLocation = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
          );
          const data = await res.json();
          const place =
            data.address?.city || data.address?.town || data.display_name;
          if (place) {
            setLocation(place);
            setUseLiveLocation(true);
          }
        } catch {
          alert("Unable to fetch location details.");
        }
      },
      () => alert("Permission denied for live location."),
      { timeout: 10000 },
    );
  };

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
          <MapPin className="w-4 h-4 text-orange-500" />
          Location
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              setUseLiveLocation(false);
            }}
            placeholder="e.g., Delhi, New York..."
            className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
            disabled={useLiveLocation}
            style={{ color: '#111827' }}
          />
          <button
            type="button"
            onClick={fetchLiveLocation}
            title="Use current location"
            className="px-3 py-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition"
          >
            <Crosshair size={16} />
          </button>
        </div>
        {useLiveLocation && (
          <p className="text-xs text-green-600">Using your live location</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          What are you craving?
        </label>
        <textarea
          value={preferences}
          onChange={(e) => setPreferences(e.target.value)}
          rows={2}
          placeholder="e.g., spicy, vegetarian, quick..."
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
          required
          style={{ color: '#111827' }}
        />
      </div>

      <motion.button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 text-white font-semibold text-sm rounded-lg hover:bg-orange-600 transition-all"
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
            <span>Find My Lunch</span>
          </>
        )}
      </motion.button>
    </motion.form>
  );
};

export default InputForm;
