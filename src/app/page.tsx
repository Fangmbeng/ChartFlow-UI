'use client';

import dynamic from 'next/dynamic';
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';

// Dynamically load Spline only on client side
const Spline = dynamic(() => import('./components/ui/SplineClient'), {
  ssr: false,
});

export default function Home() {
  const router = useRouter();

  return (
    <div className="relative flex flex-col min-h-screen bg-black text-white overflow-hidden">
      {/* Placeholder for Background Animation */}
      <div className="absolute inset-0 z-0">
        <Spline scene="https://prod.spline.design/Pmg3OduIGBepD8z7/scene.splinecode" 
        />
      <div className="w-full h-full bg-gradient-to-br from-black via-gray-900 to-black opacity-30"></div>
      </div>

        {/* Foreground Content */}
        <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex justify-between items-center px-6 py-4 border-b border-white/10 bg-black/60 backdrop-blur">
          <div className="text-xl font-bold">ChartFlow AI</div>
          <div className="space-x-4">
            <button className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition">
              Log in
            </button>
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
              Sign up
            </button>
          </div>
        </header>

        {/* Main */}
        <main className="flex flex-col items-center justify-center text-center px-6 py-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Welcome to Chartflow AI</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-10">
            The  World&apos;s #1 Software Architecture Designer Tool tailored for multiple Business Sectors
          </p>

        <motion.button
          onClick={() => router.push('/')}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-8 px-8 py-3 bg-gradient-to-r from-green-400 via-teal-400 to-blue-500 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-transform duration-300 backdrop-blur-md"
        >
          Get Started
        </motion.button>

          {/* Feature Cards with Soft UI */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl px-4">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-left text-white shadow-[inset_2px_2px_4px_rgba(255,255,255,0.1),_inset_-2px_-2px_4px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_20px_rgba(255,255,255,0.05)] transition-all duration-300">
              <h3 className="text-2xl font-semibold mb-2">Write Business Logic</h3>
              <p className="text-white/70 text-sm">
                ChartFlow AI helps you design Software Architecture, to provide robust &amp; secure applications for multiple business sectors.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-left text-white shadow-[inset_2px_2px_4px_rgba(255,255,255,0.1),_inset_-2px_-2px_4px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_20px_rgba(255,255,255,0.05)] transition-all duration-300">
              <h3 className="text-2xl font-semibold mb-2">Generate Design</h3>
              <p className="text-white/70 text-sm">
                Write or upload your business logic. Chartflow AI is tailored for any technical level, implementing DevSecOps throughout the design.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-left text-white shadow-[inset_2px_2px_4px_rgba(255,255,255,0.1),_inset_-2px_-2px_4px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_20px_rgba(255,255,255,0.05)] transition-all duration-300">
              <h3 className="text-2xl font-semibold mb-2">Get Instant Results</h3>
              <p className="text-white/70 text-sm">
                Get your downloadable design, detailed SDLC documentation, Future Consideration &amp; Potential Risk Analysis.
              </p>
            </div>
          </div>
        </main>
        

        {/* Footer */}
        <footer className="text-sm text-white/50 text-center py-6 border-t border-white/10">
          &copy; {new Date().getFullYear()} ChartFlow AI. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
