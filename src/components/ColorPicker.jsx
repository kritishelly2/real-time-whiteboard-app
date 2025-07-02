
import React from 'react';
import { motion } from 'framer-motion';

const ColorPicker = ({ colors, currentColor, onColorSelect, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, x: -20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.8, x: -20 }}
      className="absolute left-16 top-0 bg-black/80 backdrop-blur-lg rounded-xl p-4 border border-white/20 shadow-2xl"
    >
      <div className="grid grid-cols-3 gap-2 w-32">
        {colors.map((color) => (
          <motion.button
            key={color}
            onClick={() => {
              onColorSelect(color);
              onClose();
            }}
            className={`w-8 h-8 rounded-lg border-2 transition-all ${
              currentColor === color 
                ? 'border-white scale-110 shadow-lg' 
                : 'border-white/30 hover:border-white/60 hover:scale-105'
            }`}
            style={{ backgroundColor: color }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          />
        ))}
      </div>
      
      {/* Custom Color Input */}
      <div className="mt-3 pt-3 border-t border-white/20">
        <input
          type="color"
          value={currentColor}
          onChange={(e) => onColorSelect(e.target.value)}
          className="w-full h-8 rounded-lg border border-white/30 bg-transparent cursor-pointer"
          title="Custom Color"
        />
      </div>
    </motion.div>
  );
};

export default ColorPicker;
