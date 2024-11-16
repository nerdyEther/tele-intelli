import React, { useState, useEffect } from 'react';
import { LogIn, Home, MessageCircle, ThumbsUp, Shield, Rocket, Moon, Sun } from 'lucide-react';
import { Button } from "./ui/button";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Updated Theme Toggle Component
const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);  // Changed initial state to false

  useEffect(() => {
    // Check initial theme
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      // Remove dark class and set light theme as default
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 hover:from-blue-500/20 hover:to-cyan-500/20 text-blue-600 dark:text-blue-400"
    >
      {isDark ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </motion.button>
  );
};

const NavButton = ({ icon: Icon, text }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Button
      variant="ghost"
      className="relative group px-4 py-2 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="flex items-center gap-2"
        animate={{ y: isHovered ? -2 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Icon className="w-4 h-4" />
        <span className="font-medium">{text}</span>
      </motion.div>
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-blue-500 dark:bg-blue-400 w-0 group-hover:w-full transition-all duration-300"
        initial={false}
        animate={{ width: isHovered ? "100%" : "0%" }}
      />
    </Button>
  );
};

const AnimatedLoginButton = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        variant="ghost"
        className="relative overflow-hidden group px-6 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 hover:from-blue-500/20 hover:to-cyan-500/20 text-blue-600 dark:text-blue-400"
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="flex items-center gap-2"
          animate={{ x: isHovered ? 5 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <span>Log in</span>
          <motion.div
            animate={{
              rotate: isHovered ? 90 : 0,
              x: isHovered ? 5 : 0,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <LogIn className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </Button>
    </motion.div>
  );
};

const AnimatedGetStartedButton = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        variant="outline"
        className="relative overflow-hidden group px-6 py-2 rounded-full border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="flex items-center gap-2"
          animate={{ x: isHovered ? 5 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <span>Get Started</span>
          <motion.div
            animate={{
              x: isHovered ? 5 : 0,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Rocket className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </Button>
    </motion.div>
  );
};

const AnimatedLogo = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      animate={{ rotate: isHovered ? 360 : 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="cursor-pointer"
    >
      <Shield className="w-8 h-8 text-blue-500 dark:text-blue-400" />
    </motion.div>
  );
};

const Navbar = ({ onLoginClick, onSignupClick }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4 sm:p-6 backdrop-blur-sm bg-white/30 dark:bg-gray-900/30">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center space-x-2">
            <AnimatedLogo />
          </Link>
          <div className="hidden sm:flex items-center gap-4">
            <NavButton icon={Home} text="Home" />
            <NavButton icon={MessageCircle} text="Contact" />
            <NavButton icon={ThumbsUp} text="Feedback" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <AnimatedLoginButton onClick={onLoginClick} />
          <AnimatedGetStartedButton onClick={onSignupClick} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;