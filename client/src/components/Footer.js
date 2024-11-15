import { motion } from 'framer-motion';

const Footer = () => {
    return (
      <footer className="w-full py-6 ">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center text-gray-600 font-medium"
          >
            Brought to you by{" "}
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-transparent bg-clip-text font-bold">
              nerdyEther
            </span>
          </motion.div>
        </div>
      </footer>
    );
  };
  
  export default Footer;