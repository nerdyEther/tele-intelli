import React from 'react';
import { motion } from 'framer-motion';

const GradientLoader = ({ size = "md" }) => {
  const sizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`relative ${sizes[size]}`}>
        {/* Outer spinning circle with dark mode variants */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-400 dark:to-cyan-400"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{
            rotate: {
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            },
            scale: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />
        
        {/* Inner spinning circle with dark mode variants */}
        <motion.div
          className="absolute inset-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 dark:from-cyan-400 dark:to-blue-400"
          animate={{
            rotate: -360,
            scale: [1, 0.9, 1]
          }}
          transition={{
            rotate: {
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            },
            scale: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />
        
        {/* Center circle with dark mode variant */}
        <div className="absolute inset-2 rounded-full bg-gray-100 dark:bg-gray-800" />
        
        {/* Optional subtle glow effect for dark mode */}
        <div className="absolute -inset-2 rounded-full bg-blue-500/0 dark:bg-blue-400/10 blur-xl" />
      </div>
    </div>
  );
};

export default GradientLoader;