import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { Button } from "./ui/button";
import { AlertTriangle, Shield, LogIn, Home, MessageCircle, ThumbsUp, Rocket, BarChart3, Bot, Search } from 'lucide-react';
import LoginModal from './modals/LoginModal';
import SignupModal from './modals/SignupModal';
import { RainbowButton } from "./ui/rainbow-button";
import WordRotate from "./ui/word-rotate";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import EnhancedFeatures from './EnhancedFeatures';


const Scene = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2, 5]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
    </>
  );
};

const FeatureCard = ({ icon: Icon, title, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      className="flex items-center gap-3 p-4 rounded-xl bg-white/30 backdrop-blur-sm hover:bg-white/40 transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={{ rotate: isHovered ? 360 : 0 }}
        transition={{ duration: 0.5 }}
        className="p-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10"
      >
        <Icon className="w-6 h-6 text-blue-500" />
      </motion.div>
      <span className="text-lg text-gray-700 font-medium">{title}</span>
    </motion.div>
  );
};

const NavButton = ({ icon: Icon, text }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Button
      variant="ghost"
      className="relative group px-4 py-2 text-blue-500 hover:text-blue-600 transition-colors duration-200"
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
        className="absolute bottom-0 left-0 h-0.5 bg-blue-500 w-0 group-hover:w-full transition-all duration-300"
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
        className="relative overflow-hidden group px-6 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 hover:from-blue-500/20 hover:to-cyan-500/20 text-blue-600"
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
        className="relative overflow-hidden group px-6 py-2 rounded-full border-blue-500 text-blue-600 hover:bg-blue-50"
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
      <Shield className="w-8 h-8 text-blue-500" />
    </motion.div>
  );
};

const FeaturesSection = () => {
  const features = [
    { icon: Rocket, title: "Save Time with Smart Analysis" },
    { icon: Shield, title: "Enhance Group Security" },
    { icon: BarChart3, title: "Visualize Data Instantly" },
    { icon: Bot, title: "Easily Invite & Manage Bots" },
    { icon: Search, title: "Track Activity Spikes & Sentiment Changes" }
  ];

  return (
    <section className="w-full py-12 bg-gradient-to-b from-transparent to-gray-100">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.h2
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="text-4xl font-bold text-gray-800 mb-6"
          >
            What is{" "}
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-transparent bg-clip-text">
              Tele-Intelli
            </span>
            ?
          </motion.h2>
          <motion.p
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 mb-8"
          >
            Tele-Intelli is a secure, smart Telegram group management app designed for{" "}
            <span className="text-blue-500 font-medium">hassle-free monitoring</span>{" "}
            and{" "}
            <span className="text-blue-500 font-medium">analysis</span>{" "}
            of your group chats.
          </motion.p>
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-medium text-xl text-gray-700 mb-8"
          >
            With{" "}
            <span className="italic text-blue-500">Tele-Intelli</span>
            , you can:
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                delay={0.4 + index * 0.1}
              />
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 text-lg font-medium text-blue-500"
          >
            And it's all free.
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default function LandingPage() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignupOpen, setSignupOpen] = useState(false);

  return (
    <div className="bg-gray-100 relative overflow-hidden font-sans">
      {/* Fixed navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-4 sm:p-6 backdrop-blur-sm bg-white/30">
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
            <AnimatedLoginButton onClick={() => setLoginOpen(true)} />
            <AnimatedGetStartedButton onClick={() => setSignupOpen(true)} />
          </div>
        </div>
      </nav>

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
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-800 mb-3 sm:mb-4 tracking-tight leading-tight">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                  <span>Secure Telegram</span>
                  <WordRotate
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 text-transparent bg-clip-text"
                    words={["Users", "Chats", "Groups"]}
                  />
                </div>
                <span className="text-gray-800">
                  With Tele-Intelli
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
                Enhance your group chats with advanced security features.
                Stay protected against spam, scams, and unwanted content.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <RainbowButton
                  size="lg"
                  className="text-white min-w-[200px] text-lg shadow-lg hover:shadow-xl transition-shadow"
                  onClick={() => setSignupOpen(true)}
                >
                  Get Started
                </RainbowButton>
              </div>
            </motion.div>

            {/* Floating alert triangle */}
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
              <AlertTriangle className="w-12 h-12 sm:w-16 sm:h-16 text-blue-500/40" />
            </motion.div>
          </div>
        </section>

        <main className="bg-gray-100">
      
          
          <FeaturesSection />
      
          <EnhancedFeatures  />

      

          <footer className="text-left  text-gray-600 px-5 py-5 mt-0">
  Brought to you by NerdyEther
</footer>
 

        </main>
      </div>

      <LoginModal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} />
      <SignupModal isOpen={isSignupOpen} onClose={() => setSignupOpen(false)} />
    </div>
  );
}