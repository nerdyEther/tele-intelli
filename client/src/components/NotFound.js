import React from 'react';
import { motion } from 'framer-motion';
import { Home, AlertCircle } from 'lucide-react';
import { RainbowButton } from "./ui/rainbow-button";

const NotFound = () => {
  // Animation variants for text and button
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  // Floating animation for the icon
  const floatingAnimation = {
    y: [0, -10, 0],
    rotate: [-5, 5, -5],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      {/* Background gradient blur effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-50">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
          <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* 404 Icon */}
          <motion.div 
            className="flex justify-center mb-8"
            animate={floatingAnimation}
          >
            <AlertCircle className="w-24 h-24 text-blue-500 dark:text-blue-400" />
          </motion.div>

          {/* Error message */}
          <motion.h1 
            variants={itemVariants}
            className="text-6xl md:text-7xl font-bold text-gray-800 dark:text-gray-100"
          >
            404
          </motion.h1>

          <motion.div 
            variants={itemVariants}
            className="space-y-4"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-200">
              Page Not Found
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Oops! The page you're looking for seems to have wandered off into the digital void.
            </p>
          </motion.div>

          {/* Action button */}
          <motion.div 
            variants={itemVariants}
            className="pt-4"
          >
            <RainbowButton
              onClick={() => window.location.href = '/'}
              size="lg"
              className="text-white dark:text-black inline-flex items-center gap-2"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </RainbowButton>
          </motion.div>
        </motion.div>
      </div>

      
    </div>
  );
};

export default NotFound;