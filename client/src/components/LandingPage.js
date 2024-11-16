import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { AlertTriangle } from 'lucide-react';
import LoginModal from './modals/LoginModal';
import SignupModal from './modals/SignupModal';
import { RainbowButton } from "./ui/rainbow-button";
import WordRotate from "./ui/word-rotate";
import { motion } from 'framer-motion';
import EnhancedFeatures from './EnhancedFeatures';
import Navbar from './NavBar';
import FeaturesSection from './FeaturesSection';
import Footer from './Footer';
import GradientLoader from './GradientLoader';

const Scene = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2, 5]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
    </>
  );
};

export default function LandingPage() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignupOpen, setSignupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 

  React.useEffect(() => {
    // Simulate some initial loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <GradientLoader size="xl" />
      </div>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 relative overflow-hidden font-sans">
      <Navbar 
        onLoginClick={() => setLoginOpen(true)}
        onSignupClick={() => setSignupOpen(true)}
      />

      <div className="absolute inset-0">
        <Canvas>
          <Scene />
        </Canvas>
      </div>

      <div className="relative z-10 flex flex-col">
        <section className="min-h-screen flex items-center pt-20 relative">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="font-serif text-display-lg md:text-display-xl font-bold text-gray-800 dark:text-gray-100 mb-3 sm:mb-4 tracking-tight leading-tight">
  <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
    <span>Secure Telegram</span>
    <WordRotate 
      className="bg-gradient-to-r from-blue-500 to-cyan-500 text-transparent bg-clip-text"
      words={["Users", "Chats", "Groups"]}
    />
  </div>
  <span className="text-gray-800 dark:text-gray-100">
    With Tele-Intelli
  </span>
</h1>
<p className="font-sans text-body-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
  Enhance your group chats with advanced security features.
  Stay protected against spam, scams, and unwanted content.
</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <RainbowButton
                  size="lg"
                className="text-white dark:text-black min-w-[200px] text-lg shadow-lg hover:shadow-xl transition-shadow dark:shadow-blue-500/20"
                  onClick={() => setSignupOpen(true)}
                >
                  Get Started
                </RainbowButton>
              </div>
            </motion.div>

            <motion.div
              className="absolute top-1/2 right-8 sm:right-16 transform -translate-y-1/2"
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <AlertTriangle className="w-12 h-12 sm:w-16 sm:h-16 text-blue-500/40 dark:text-blue-400/40" />
            </motion.div>
          </div>
        </section>

        <main className="bg-gray-100 dark:bg-gray-900">
          <FeaturesSection />
          <EnhancedFeatures />
          <Footer />
        </main>
      </div>

      <LoginModal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} />
      <SignupModal isOpen={isSignupOpen} onClose={() => setSignupOpen(false)} />
    </div>
  );
}