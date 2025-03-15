'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaTimesCircle, FaArrowLeft } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PaymentFailed = () => {
  const [showContent, setShowContent] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowContent(true);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleBackToStart = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center px-4 py-8 mt-[100px]">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-2xl p-6 sm:p-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
              className="mb-6"
            >
              <FaTimesCircle className="w-20 h-20 sm:w-24 sm:h-24 mx-auto text-red-500" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-3xl sm:text-4xl font-bold text-white mb-4"
            >
              Zahlung fehlgeschlagen
            </motion.h1>
            {showContent && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <p className="text-red-200 mb-8 text-sm sm:text-base">
                  Es tut uns leid, aber Ihre Zahlung konnte nicht verarbeitet werden. Bitte überprüfen Sie Ihre Zahlungsinformationen und versuchen Sie es erneut.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBackToStart}
                  className="bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-full inline-flex items-center justify-center w-full sm:w-auto transition duration-300 ease-in-out transform hover:shadow-lg text-sm sm:text-base"
                >
                  <FaArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Zurück zum Start
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentFailed;

