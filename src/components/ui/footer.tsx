'use client';

import { motion } from 'framer-motion';

export default function Footer() {
    return(
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-center text-sm text-white-500  border-t border-white/10 py-6"
            >
            <div className="mb-2">Sponsored by 237Tech AI</div>
            <div className="flex justify-center gap-4 flex-wrap">
                <span>ChartFlow AI • Intelligent Architecture Generator &copy; {new Date().getFullYear()}</span>
                <a href="/404" className="hover:text-blue-500 transition-colors duration-200">About Us</a>
                <a href="/404" className="hover:text-blue-500 transition-colors duration-200">Terms</a>
                <a href="/404" className="hover:text-blue-500 transition-colors duration-200">Privacy</a>
                <a href="/feedback" className="hover:text-blue-500 transition-colors duration-200">Feedback</a>
            </div>
        </motion.div>
    )
}