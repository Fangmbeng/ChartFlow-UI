'use client';
import { motion } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import { useCallback, useEffect, useState } from 'react';
import type { Engine } from 'tsparticles-engine';
import { useRouter } from 'next/navigation';

const PageWrapper = ({ title, content }: { title: string; content: string }) => {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(true);
  const [isOsTheme, setIsOsTheme] = useState(true);

  // OS theme detection
  useEffect(() => {
    // Check if user prefers dark mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);

    // Listen for changes in OS theme preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (isOsTheme) {
        setDarkMode(e.matches);
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [isOsTheme]);

  // Toggle theme function
  const toggleTheme = () => {
    if (isOsTheme) {
      // First click switches to manual mode with current theme
      setIsOsTheme(false);
    } else {
      // Subsequent clicks toggle the theme manually
      setDarkMode(!darkMode);
    }
  };

  // Reset to OS theme
  const resetToOsTheme = () => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
    setIsOsTheme(true);
  };

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particleColor = darkMode 
    ? ['#8a8aff', '#79ffb3', '#d3a5ff'] 
    : ['#3030cc', '#00a651', '#884dff'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7, 
        ease: "easeOut" 
      }
    }
  };

  return (
    <div className={`relative min-h-screen ${darkMode ? 'bg-black text-white' : 'bg-gray-100 text-gray-900'} px-6 py-20 overflow-hidden transition-colors duration-300`}>
      {/* Theme toggle button */}
      <div className="absolute top-6 right-6 z-20 flex gap-3">
        <motion.button
          onClick={resetToOsTheme}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`p-2 rounded-full ${
            isOsTheme 
              ? 'bg-gradient-to-r from-blue-400 to-purple-500 text-white' 
              : 'bg-gray-700 text-gray-300'
          } flex items-center justify-center`}
          title="Use OS theme"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
        </motion.button>
        
        <motion.button
          onClick={toggleTheme}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-full bg-gray-700 text-gray-300 flex items-center justify-center"
          title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          )}
        </motion.button>
      </div>

      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: false,
          background: { color: { value: 'transparent' } },
          particles: {
            number: { value: 40 },
            size: { value: { min: 1, max: 3 } },
            move: { 
              enable: true, 
              speed: 0.6,
              direction: "none",
              random: true,
              outModes: "out"
            },
            opacity: { value: { min: 0.2, max: 0.5 } },
            color: { value: particleColor },
            shape: { type: "circle" },
            links: {
              enable: true,
              distance: 150,
              color: darkMode ? '#ffffff' : '#000000',
              opacity: 0.2,
              width: 1,
            },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 z-0 pointer-events-none"
      />
      
      <motion.div 
        className="relative z-10 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          variants={itemVariants}
          className="flex items-center justify-center mb-2"
        >
          {!isOsTheme && (
            <span className="text-sm px-3 py-1 rounded-full bg-gray-700 bg-opacity-50 text-gray-300 mb-2">
              {darkMode ? "Dark Mode" : "Light Mode"}
            </span>
          )}
          {isOsTheme && (
            <span className="text-sm px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 bg-opacity-70 text-white mb-2">
              OS Theme
            </span>
          )}
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className={`text-5xl font-bold text-center mb-12 ${
            darkMode 
              ? 'bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500' 
              : 'bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600'
          }`}
        >
          {title}
        </motion.h1>
      
        <motion.div
          variants={itemVariants}
          className={`leading-relaxed space-y-6 text-lg ${
            darkMode 
              ? 'bg-white/5 text-gray-300' 
              : 'bg-white/90 text-gray-800'
          } backdrop-blur p-8 rounded-xl shadow-xl`}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      
        <motion.div 
          variants={itemVariants}
          className="mt-12 text-center"
        >
          <motion.span
            onClick={() => router.push('/')}
            className={`inline-block cursor-pointer bg-gradient-to-r from-green-400 via-teal-400 to-blue-500 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-300`}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)" 
            }}
            whileTap={{ scale: 0.98 }}
          >
            Back to Home
          </motion.span>
        </motion.div>
      </motion.div>
    </div>
  );
};



export const TermsOfService = () => (
    <PageWrapper
      title="Terms of Service"
      content={`
        <p class="text-xl font-semibold mb-6">Last Updated: April 21, 2025</p>
        
        <p class="mb-6">Welcome to ChartFlow AI. By accessing or using our platform, you agree to be bound by these Terms of Service. Please read them carefully before proceeding.</p>
        
        <h2 class="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
        
        <p class="mb-6">By creating an account or using any part of ChartFlow AI's services, you acknowledge that you have read, understood, and agree to be bound by these terms. If you do not agree, please discontinue use immediately.</p>
        
        <h2 class="text-2xl font-semibold mt-8 mb-4">2. Account Responsibilities</h2>
        
        <p class="mb-6">You are responsible for maintaining the confidentiality of your account credentials and for all activities occurring under your account. You agree to notify us immediately of any unauthorized use or security breaches.</p>
        
        <h2 class="text-2xl font-semibold mt-8 mb-4">3. Acceptable Use</h2>
        
        <p class="mb-6">When using our platform, you agree to:</p>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li>Comply with all applicable laws and regulations</li>
          <li>Respect the intellectual property rights of others</li>
          <li>Refrain from uploading harmful content or malicious code</li>
          <li>Not attempt to gain unauthorized access to any part of our systems</li>
        </ul>
        
        <h2 class="text-2xl font-semibold mt-8 mb-4">4. Data Usage</h2>
        
        <p class="mb-6">By using ChartFlow AI, you grant us permission to collect and analyze anonymized usage data to improve our services. This data helps us enhance functionality, fix issues, and develop new features that better serve our users' needs.</p>
        
        <h2 class="text-2xl font-semibold mt-8 mb-4">5. Service Modifications</h2>
        
        <p class="mb-6">We reserve the right to modify, suspend, or discontinue any aspect of our service at any time, with or without notice. This includes maintenance, updates, or addressing security concerns.</p>
        
        <h2 class="text-2xl font-semibold mt-8 mb-4">6. Account Termination</h2>
        
        <p class="mb-6">We may suspend or terminate accounts that violate these terms, engage in fraudulent activity, or pose a risk to our platform or other users. You may also terminate your account at any time through your account settings.</p>
        
        <p class="italic mt-8">By continuing to use ChartFlow AI, you acknowledge that you have read and understood these Terms of Service.</p>
      `}
    />
  );
