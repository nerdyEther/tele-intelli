import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, BarChart3, Bot, Search, Rocket } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      className="flex items-center gap-3 p-4 rounded-xl bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm hover:bg-white/40 dark:hover:bg-gray-700/40 transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={{ rotate: isHovered ? 360 : 0 }}
        transition={{ duration: 0.5 }}
        className="p-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 dark:from-blue-400/10 dark:to-cyan-400/10"
      >
        <Icon className="w-6 h-6 text-blue-500 dark:text-blue-400" />
      </motion.div>
      <span className="text-lg text-gray-700 dark:text-gray-200 font-medium">{title}</span>
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
    <section className="w-full py-12 bg-gradient-to-b from-transparent to-gray-100 dark:to-gray-800">
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
            className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6"
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
            className="text-lg text-gray-600 dark:text-gray-300 mb-8"
          >
            Tele-Intelli is a secure, smart Telegram group management app designed for{" "}
            <span className="text-blue-500 dark:text-blue-400 font-medium">hassle-free monitoring</span>{" "}
            and{" "}
            <span className="text-blue-500 dark:text-blue-400 font-medium">analysis</span>{" "}
            of your group chats.
          </motion.p>
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-medium text-xl text-gray-700 dark:text-gray-200 mb-8"
          >
            With{" "}
            <span className="italic text-blue-500 dark:text-blue-400">Tele-Intelli</span>
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
            className="mt-8 text-lg font-medium text-blue-500 dark:text-blue-400"
          >
            And it's all free.
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;