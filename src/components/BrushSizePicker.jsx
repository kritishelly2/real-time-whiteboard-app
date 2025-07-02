
import React from 'react';
import { motion } from 'framer-motion';

const BrushSizePicker = ({ brushSize, onBrushSizeChange, onClose }) => {
  const sizes = [1, 2, 3, 5, 8, 12, 16, 20];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, x: -20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.8, x: -20 }}
      className="absolute left-16 top-0 bg-black/80 backdrop-blur-lg rounded-xl p-4 border border-white/20 shadow-2xl"
    >
      <div className="space-y-3 w-32">
        <h3 className="text-white text-sm font-medium text-center">Brush Size</h3>
        
        <div className="space-y-2">
          {sizes.map((size) => (
            <motion.button
              key={size}
              onClick={() => {
                onBrushSizeChange(size);
                onClose();
              }}
              className={`w-full h-8 rounded-lg flex items-center justify-center transition-all ${
                brushSize === size 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div 
                className="rounded-full bg-current"
                style={{ 
                  width: `${Math.max(2, Math.min(size, 12))}px`,
                  height: `${Math.max(2, Math.min(size, 12))}px`
                }}
              />
              <span className="ml-2 text-xs">{size}px</span>
            </motion.button>
          ))}
        </div>
        
        {/* Custom Size Slider */}
        <div className="pt-3 border-t border-white/20">
          <input
            type="range"
            min="1"
            max="30"
            value={brushSize}
            onChange={(e) => onBrushSizeChange(parseInt(e.target.value))}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="text-center text-white/70 text-xs mt-1">
            {brushSize}px
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BrushSizePicker;
