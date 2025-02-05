import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";

const NotFound = () => {
  const messages = [
    "You flipped too fast and fell out of the book!",
    "Looks like this page doesn’t exist...",
    "Even Sherlock Holmes can’t find this page!",
    "This page is under construction... or maybe it's just fiction?",
    "Did you just try to enter a restricted spellbook? Nice try!"
  ];

  const [randomMessage] = useState(
    messages[Math.floor(Math.random() * messages.length)]
  );

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center p-6">
      {/* Lottie Animation */}
      <div className="w-80 h-80">
        <DotLottieReact
          src="https://lottie.host/16041430-759c-436b-aeda-4a93cb1cb601/TVJVlN88iq.lottie"
          loop
          autoplay
        />
      </div>

      {/* Funny Message */}
      <motion.h1
        className="text-3xl font-bold text-gray-900 mt-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Oops! {randomMessage}
      </motion.h1>

      <motion.p
        className="text-lg text-gray-600 mt-2 italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Quick! Before the book closes on you...
      </motion.p>

      {/* Panic Button */}
      <motion.div
        className="mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Link to="/">
          <motion.button
            className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-lg hover:bg-red-700 hover:scale-110 transition-transform"
            whileHover={{ scale: 1.2, rotate: -3 }}
            whileTap={{ scale: 0.9 }}
          >
            Take me Home! 🚀
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
