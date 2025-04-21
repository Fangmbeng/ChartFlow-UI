'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Footer from '@/components/ui/footer';
import Navbar from '@/components/ui/navbar';
import Image from 'next/image';
import { Star } from 'lucide-react';

const Spline = dynamic(() => import('./animations/ui/SplineClient'), {
  ssr: false,
});

const reviews = [
  "GitFlow AI completely streamlined our architecture process. Love it!",
  "This tool saves hours of documentation and planning. Brilliant UI!",
  "As a startup CTO, this is the best assistant I’ve used so far.",
  "AI-generated SDLC documents are shockingly accurate. 10/10",
  "Made our system design presentation look world-class. Highly recommend!",
  "Even our non-tech founder understood the output. That’s a win.",
  "From user flow to risk analysis — all in one click. Magical."
];

export default function Home() {
  const router = useRouter();

  return (
    <div className="relative flex flex-col min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Spline scene="https://prod.spline.design/Pmg3OduIGBepD8z7/scene.splinecode" />
        <div className="w-full h-full bg-gradient-to-br from-black via-gray-900 to-black opacity-30"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

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
            Welcome to the World's 1st Software Architecture Designer Tool tailored for multiple Business Sectors
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

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl px-4">
            {['Write Business Logic', 'Generate Design', 'Get Instant Results'].map((title, i) => (
              <motion.div
                key={i}
                initial={{ x: i % 2 === 0 ? -100 : 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 2, delay: i * 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/10 backdrop-blur rounded-2xl p-6 text-left text-white shadow-[inset_2px_2px_4px_rgba(255,255,255,0.1),_inset_-2px_-2px_4px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_20px_rgba(255,255,255,0.05)] transition-all duration-300"
              >
                <h3 className="text-2xl font-semibold mb-2">{title}</h3>
                <p className="text-white/70 text-sm">
                  {i === 0 && 'GitFlow AI helps you design Software Architecture, to provide robust & secure applications for multiple business sectors.'}
                  {i === 1 && 'Write or upload your business logic. GitFlow AI is tailored for any technical level, implementing DevSecOps throughout the design.'}
                  {i === 2 && 'Get your downloadable design, detailed SDLC documentation, Future Consideration & Potential Risk Analysis.'}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Screenshots Top Left - Floating */}
          <div className="relative mt-24 w-full max-w-6xl h-[550px]">
            {[1, 2, 3].map((i, index) => (
              <motion.div
                key={i}
                initial={{ x: index % 2 === 0 ? -400 : 400, opacity: 0 }}
                animate={{ x: 0, opacity: [0, 1, 0] }}
                transition={{
                  duration: 16,
                  delay: i * 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                whileHover={{
                  scale: 1.1,
                  y: -10,
                  transition: { duration: 0.4 },
                }}
                className="absolute left-0 z-10"
                style={{ top: `${i * 180}px` }}
              >
                <Image
                  src={`/screens/screen${i}.png`}
                  alt={`Screenshot ${i}`}
                  width={420}
                  height={260}
                  className="rounded-2xl object-contain shadow-xl cursor-pointer transition-opacity duration-500 hover:blur-[1px]"
                  />
              </motion.div>
            ))}



            {/* Floating Reviews on Right Side, spaced apart */}
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: '40%', opacity: [0, 1, 0] }}
                transition={{ duration: 14, delay: i * 1.5, repeat: Infinity }}
                className="absolute right-0 bg-white/10 text-white text-sm md:text-base px-4 py-3 rounded-lg shadow backdrop-blur-lg max-w-sm"
                style={{ top: `${i * 69}px` }}
              >
                {review}
              </motion.div>
            ))}
          </div>
        </main>

        <div className="mt-32 py-12 px-6 bg-gradient-to-b from-black via-gray-900 to-black w-full flex flex-col items-center gap-8">
          <h3 className="text-white text-sm uppercase tracking-widest font-medium opacity-70">Powered by</h3>
          <div className="flex gap-12 items-center justify-center animate-slideSlow overflow-hidden">
            {[
              { name: 'Coding Temple Alumini', url: 'https://www.linkedin.com/showcase/coding-temple-alumni/about/' },
              { name: 'myskinci', url: 'https://myskinci.com/home' },
              { name: 'groq_1', url: 'https://console.groq.com/docs/overview' },
              { name: 'vercel', url: 'https://vercel.com' },
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
              <Star key={i} className={i <= 4 ? 'fill-current' : 'opacity-30'} />
            ))}
            <span className="text-white text-sm ml-2">4.8/5 average rating</span>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
