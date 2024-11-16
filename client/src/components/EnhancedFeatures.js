import React from 'react';
import { Globe, Shield, Phone, Copy } from 'lucide-react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <motion.div
      whileHover={{ 
        translateY: -10,
        rotateX: 5,
        rotateY: 5,
        scale: 1.02
      }}
      className="relative group mb-6"
    >
      {/* Magic UI inspired border beam */}
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 opacity-0 
        group-hover:opacity-100 duration-500 group-hover:duration-200 animate-gradient-x blur-sm" />
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 opacity-0 
        group-hover:opacity-100 duration-500 group-hover:duration-200 animate-gradient-x" />
      
      <div className="relative flex flex-col items-center p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-lg">
        <div className="p-4 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 dark:from-blue-400/10 dark:to-cyan-400/10 mb-4">
          <Icon className="w-8 h-8 text-blue-500 dark:text-blue-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-center">{description}</p>
      </div>
    </motion.div>
  );
};

const EnhancedFeatures = () => {
  const features = [
    {
      icon: Globe,
      title: "Enhanced Integration",
      description: "Advanced Security Capabilities"
    },
    {
      icon: Shield,
      title: "Real-time Monitoring",
      description: "Dynamic 3D Visualization with Real time insights"
    },
    {
      icon: Phone,
      title: "Intelligent Alerts",
      description: "Stay one step ahead with our intelligent alert system"
    },
    {
      icon: Copy,
      title: "Easy Oversight",
      description: "Manage multiple groups with ease."
    }
  ];

  return (
    <section className="w-full py-20 bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-6xl mx-auto px-4 mt-0 mb-20">
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
            Why{" "}
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-transparent bg-clip-text">
              Tele-Intelli
            </span>
            ?
          </motion.h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnhancedFeatures;