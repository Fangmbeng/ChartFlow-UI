'use client';
import { motion } from 'framer-motion';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim'; // Changed from loadFull to loadSlim
import { useCallback, useState, useEffect } from 'react';
import Image from 'next/image';
import { Star, Filter, ChevronUp, ChevronDown, Send } from 'lucide-react';
import type { Engine } from 'tsparticles-engine';

// Define the review interface for type safety
interface Review {
  text: string;
  name: string;
  stars: number;
  role: string;
  industry: string;
  date: string;
}

// Enhanced reviews with names and star ratings
const reviews: Review[] = [
  { 
    text: "GitFlow AI completely streamlined our architecture process. Love it!",
    name: "Michael Chen",
    stars: 5,
    role: "Senior Architect, TechSphere",
    industry: "Technology",
    date: "2025-03-15"
  },
  { 
    text: "This tool saves hours of documentation and planning. Brilliant UI!",
    name: "Sarah Johnson",
    stars: 5,
    role: "Project Manager, InnovateCorp",
    industry: "Software Development",
    date: "2025-03-02"
  },
  { 
    text: "As a startup CTO, this is the best assistant I&apos;ve used so far.",
    name: "Alex Rivera",
    stars: 5,
    role: "CTO, LaunchPad",
    industry: "Startups",
    date: "2025-02-28"
  },
  { 
    text: "AI-generated SDLC documents are shockingly accurate. 10/10",
    name: "Priya Patel",
    stars: 5,
    role: "DevOps Engineer, CloudNine",
    industry: "Cloud Services",
    date: "2025-03-10"
  },
  { 
    text: "Made our system design presentation look world-class. Highly recommend!",
    name: "David Thompson",
    stars: 5,
    role: "Lead Developer, CodeCraft",
    industry: "Software Development",
    date: "2025-02-20"
  },
  { 
    text: "Even our non-tech founder understood the output. That&apos;s a win.",
    name: "Emma Wilson",
    stars: 4,
    role: "Product Owner, StartupX",
    industry: "E-commerce",
    date: "2025-03-05"
  },
  { 
    text: "From user flow to risk analysis — all in one click. Magical.",
    name: "James Lee",
    stars: 4,
    role: "System Architect, DataFlow",
    industry: "Data Analytics",
    date: "2025-03-18"
  }
];

// Available industries for filtering
const industries = [...new Set(reviews.map(review => review.industry))];

// Fixed average rating to 4.8 as requested
const averageRating = 4.8;

export default function FeedbackPage() {
  const [filteredReviews, setFilteredReviews] = useState<Review[]>(reviews);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortBy, setSortBy] = useState("newest"); // newest, highest, lowest
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Form state
  const [reviewText, setReviewText] = useState("");
  const [reviewerName, setReviewerName] = useState("");
  const [reviewerRole, setReviewerRole] = useState("");
  const [reviewerIndustry, setReviewerIndustry] = useState("");
  const [selectedStars, setSelectedStars] = useState(5);
  const [showThankYou, setShowThankYou] = useState(false);

  // Fix the tsparticles initialization error by using loadSlim instead of loadFull
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  // Handle scrolling effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter and sort reviews
  useEffect(() => {
    let result = [...reviews];
    
    // Filter by industry
    if (selectedIndustry !== "All") {
      result = result.filter(review => review.industry === selectedIndustry);
    }
    
    // Filter by star rating
    if (selectedRating > 0) {
      result = result.filter(review => review.stars >= selectedRating);
    }
    
    // Sort reviews
    if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortBy === "highest") {
      result.sort((a, b) => b.stars - a.stars);
    } else if (sortBy === "lowest") {
      result.sort((a, b) => a.stars - b.stars);
    }
    
    setFilteredReviews(result);
  }, [selectedIndustry, selectedRating, sortBy]);

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: "easeOut"
      }
    })
  };
  
  // Handle review form submission
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would send data to the backend
    console.log({
      text: reviewText,
      name: reviewerName,
      stars: selectedStars,
      role: reviewerRole,
      industry: reviewerIndustry,
      date: new Date().toISOString().split('T')[0]
    });
    
    // Reset form
    setReviewText("");
    setReviewerName("");
    setReviewerRole("");
    setReviewerIndustry("");
    setSelectedStars(5);
    
    // Show thank you message
    setShowThankYou(true);
    setTimeout(() => setShowThankYou(false), 5000);
  };

  return (
    <ParallaxProvider>
      <div className="relative min-h-screen bg-black text-white overflow-hidden">
        {/* Particle Background */}
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
                straight: false,
                outModes: "out"
              },
              opacity: { value: { min: 0.2, max: 0.5 } },
              color: { value: ['#8a8aff', '#79ffb3', '#d3a5ff'] },
              shape: { type: "circle" },
              links: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.2,
                width: 1
              },
            },
            detectRetina: true,
            interactivity: {
              events: {
                onHover: {
                  enable: true,
                  mode: "grab"
                }
              },
              modes: {
                grab: {
                  distance: 140,
                  links: {
                    opacity: 0.5
                  }
                }
              }
            }
          }}
          className="absolute inset-0 z-0"
        />

        {/* Fixed header with blur effect when scrolled */}
        <motion.header 
          className={`sticky top-0 z-30 w-full backdrop-blur-lg transition-all duration-300 ${
            isScrolled ? 'bg-black/70 shadow-lg py-4' : 'bg-transparent py-8'
          }`}
          animate={{ 
            height: isScrolled ? 70 : 100
          }}
        >
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <h1 className={`font-bold transition-all duration-300 ${
              isScrolled ? 'text-2xl' : 'text-4xl'
            }`}>User Feedback</h1>
            
            <div className="relative">
              <button 
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition"
              >
                <Filter size={18} />
                <span>Filter</span>
                {filterOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              
              {filterOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-64 p-4 bg-gray-900 rounded-lg shadow-xl z-40"
                >
                  <div className="mb-4">
                    <h3 className="text-sm font-medium mb-2">Industry</h3>
                    <select 
                      value={selectedIndustry}
                      onChange={(e) => setSelectedIndustry(e.target.value)}
                      className="w-full bg-gray-800 text-white px-3 py-2 rounded-md"
                    >
                      <option value="All">All Industries</option>
                      {industries.map(industry => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-sm font-medium mb-2">Minimum Rating</h3>
                    <div className="flex gap-1">
                      {[0, 1, 2, 3, 4, 5].map(rating => (
                        <button 
                          key={rating}
                          onClick={() => setSelectedRating(rating)}
                          className={`flex-1 py-1 rounded ${
                            selectedRating === rating ? 'bg-blue-600' : 'bg-gray-800'
                          }`}
                        >
                          {rating === 0 ? 'All' : rating}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Sort By</h3>
                    <div className="grid grid-cols-3 gap-1">
                      {[
                        {value: 'newest', label: 'Newest'},
                        {value: 'highest', label: 'Highest'},
                        {value: 'lowest', label: 'Lowest'}
                      ].map(option => (
                        <button 
                          key={option.value}
                          onClick={() => setSortBy(option.value)}
                          className={`py-1 rounded ${
                            sortBy === option.value ? 'bg-blue-600' : 'bg-gray-800'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.header>

        <main className="relative z-10 max-w-6xl mx-auto px-6 py-12">
          {/* Summary stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              { label: "Average Rating", value: averageRating.toFixed(1) },
              { label: "Total Reviews", value: reviews.length },
              { label: "5-Star Reviews", value: reviews.filter(r => r.stars === 5).length }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center"
              >
                <h3 className="text-gray-400 text-sm mb-2">{stat.label}</h3>
                <p className="text-4xl font-bold">{stat.value}</p>
                {i === 0 && (
                  <div className="flex justify-center mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        size={16} 
                        className={star <= Math.round(Number(stat.value)) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'} 
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* New Review Submission Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-6 mb-16"
          >
            <h2 className="text-2xl font-semibold mb-6">Share Your Experience</h2>
            
            {showThankYou ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-green-900/30 border border-green-500/30 rounded-lg p-4 text-center"
              >
                <p className="text-green-400 font-medium mb-1">Thank you for your feedback!</p>
                <p className="text-green-200/70 text-sm">Your review has been submitted successfully.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmitReview}>
                <div className="mb-6">
                  <label className="block text-gray-400 text-sm mb-2">Your Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setSelectedStars(star)}
                        className="text-2xl transition-all duration-200 focus:outline-none"
                      >
                        <Star
                          size={24}
                          className={`${star <= selectedStars ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'} 
                                    hover:scale-110 transition-transform`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-400 text-sm mb-2">Your Review</label>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="What did you think about GitFlow AI?"
                    className="w-full bg-gray-800/70 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    rows={4}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Your Name</label>
                    <input
                      type="text"
                      value={reviewerName}
                      onChange={(e) => setReviewerName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full bg-gray-800/70 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Your Role</label>
                    <input
                      type="text"
                      value={reviewerRole}
                      onChange={(e) => setReviewerRole(e.target.value)}
                      placeholder="Software Developer"
                      className="w-full bg-gray-800/70 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Industry</label>
                    <select
                      value={reviewerIndustry}
                      onChange={(e) => setReviewerIndustry(e.target.value)}
                      className="w-full bg-gray-800/70 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      required
                    >
                      <option value="">Select Industry</option>
                      {industries.map(industry => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div className="text-right">
                  <button 
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-2 rounded-lg flex items-center gap-2 hover:scale-105 transition-transform duration-300 font-medium"
                  >
                    Submit Review
                    <Send size={16} />
                  </button>
                </div>
              </form>
            )}
          </motion.div>

          {/* Results messaging */}
          <div className="mb-8 text-gray-400">
            {filteredReviews.length === 0 ? (
              <p>No reviews match your current filters.</p>
            ) : (
              <p>Showing {filteredReviews.length} of {reviews.length} reviews</p>
            )}
          </div>

          {/* Reviews grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
            {filteredReviews.map((review, index) => (
              <Parallax key={index} speed={index % 2 === 0 ? 5 : -5}>
                <motion.div
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-blue-900/20 transition-all duration-500"
                >
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, starIndex) => (
                      <Star 
                        key={starIndex} 
                        size={16} 
                        className={starIndex < review.stars ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'} 
                      />
                    ))}
                    <span className="text-sm text-gray-400 ml-2">
                      {new Date(review.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  
                  <p className="text-lg mb-4 leading-relaxed">{review.text}</p>
                  
                  <div className="flex items-center mt-6">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-xl font-bold">
                      {review.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{review.name}</p>
                      <p className="text-sm text-gray-400 flex items-center gap-2">
                        <span>{review.role}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                        <span>{review.industry}</span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              </Parallax>
            ))}
          </div>

          {/* Show empty state if no reviews match filters */}
          {filteredReviews.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="my-20 text-center"
            >
              <div className="inline-flex rounded-full bg-gray-900 p-6 mb-6">
                <Filter size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-medium mb-2">No matching reviews</h3>
              <p className="text-gray-400 max-w-md mx-auto">
                Try adjusting your filters to see more results, or check back later for new reviews.
              </p>
              <button 
                onClick={() => {
                  setSelectedIndustry("All");
                  setSelectedRating(0);
                  setSortBy("newest");
                }}
                className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition"
              >
                Reset Filters
              </button>
            </motion.div>
          )}
          
          {/* CTA at bottom */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-28 text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Ready to experience GitFlow AI?</h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-8">
              Join thousands of satisfied users who have streamlined their software architecture process.
            </p>
            <a 
              href="/" 
              className="inline-block bg-gradient-to-r from-green-400 via-teal-400 to-blue-500 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
            >
              Get Started for Free
            </a>
          </motion.div>
        </main>
      </div>
    </ParallaxProvider>
  );
}