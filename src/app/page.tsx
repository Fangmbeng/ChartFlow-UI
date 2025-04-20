'use client';

import dynamic from 'next/dynamic';
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import Footer from '@/components/ui/footer';
import Navbar from '@/components/ui/navbar';
import Image from "next/image";
import { Star } from "lucide-react";

// Dynamically load Spline only on client side
const Spline = dynamic(() => import('./animations/ui/SplineClient'), {
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
        <Navbar/>

        {/* Main */}
        <main className="flex flex-col items-center justify-center text-center px-6 py-20">
        <div className="flex items-center justify-center gap-4 mb-6">
          <Image
            src="/partners/OIP (3).jpeg"
            alt="GitFlow AI Logo"
            width={48}
            height={48}
            className="object-contain"
          />
          <h1 className="text-5xl md:text-6xl font-bold">GitFlow AI</h1>
        </div>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-10">
          Welcome to the  World&apos;s 1st Software Architecture Designer Tool tailored for multiple Business Sectors
          </p>

        <motion.button
          onClick={() => router.push('/chat')}
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
                GitFlow AI helps you design Software Architecture, to provide robust &amp; secure applications for multiple business sectors.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-left text-white shadow-[inset_2px_2px_4px_rgba(255,255,255,0.1),_inset_-2px_-2px_4px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_20px_rgba(255,255,255,0.05)] transition-all duration-300">
              <h3 className="text-2xl font-semibold mb-2">Generate Design</h3>
              <p className="text-white/70 text-sm">
                Write or upload your business logic. GitFlow AI is tailored for any technical level, implementing DevSecOps throughout the design.
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


      {/* Screenshot Showcase with fade motion */}
      <div className="mt-24 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-6">See GitFlow AI in Action</h2>
        <div className="relative w-full max-w-6xl h-[500px] sm:h-[600px] overflow-hidden">
          {[1, 2, 3].map((i) => (
            <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 12, delay: i * 2, repeat: Infinity }}
            className="absolute inset-0 flex justify-center items-center"
          >
          <Image
            src={`/screens/screen${i}.png`}
            alt={`Screenshot ${i}`}
            fill
            className="rounded-xl object-contain"
            sizes="(max-width: 1024px) 100vw, 1000px"
          />
          </motion.div>

          ))}
        </div>
      </div>

      {/* Partner Logos + Rating Bar */}
      <div className="mt-32 py-12 px-6 bg-gradient-to-b from-black via-gray-900 to-black w-full flex flex-col items-center gap-8">
          {/* Title */}
        <h3 className="text-white text-sm uppercase tracking-widest font-medium opacity-70">
          Powered by
        </h3>
        <div className="flex gap-12 items-center justify-center animate-slideSlow overflow-hidden">
        {[
          { name: 'Coding Temple Alumini', url: 'https://www.linkedin.com/showcase/coding-temple-alumni/about/' },
          { name: 'myskinci', url: 'https://myskinci.com/home'},
          { name: 'groq_1', url: 'https://console.groq.com/docs/overview' },
          { name: 'vercel', url: 'https://console.groq.com/docs/overview' },
            ].map((partner, i) => (
              <a
                key={i}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-70 hover:opacity-100 transition-opacity"
              >
                <Image
                  src={`/partners/${partner.name}.jpeg`}
                  alt={`${partner.name} logo`}
                  width={100}
                  height={30}
                />
              </a>
            ))}
        </div>

        <div className="flex items-center gap-2 text-yellow-400">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} className={i <= 4 ? "fill-current" : "opacity-30"} />
          ))}
          <span className="text-white text-sm ml-2">4.8/5 average rating</span>
        </div>
      </div>
        

        {/* Footer */}
        {/* <footer className="text-sm text-white/50 text-center py-6 border-t border-white/10">
          &copy; {new Date().getFullYear()} GitFlow AI. All rights reserved.
        </footer> */}
        <Footer/>
      </div>
    </div>
  );
}