// components/Navbar.tsx
'use client';
// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from "next/image";


export default function Navbar() {
    // const [open, setOpen] = useState(false);
    const router = useRouter();
  

    return (
        <header className="flex justify-between items-center px-6 py-4 border-b border-white/10 bg-black/60 backdrop-blur">
        <div className="flex items-center gap-2">
            <Image
            src="/partners/OIP__5_-removebg-preview.png"
            alt="GitFlow AI Logo"
            width={32}
            height={32}
            className="object-contain"
            />
            <span 
            onClick={() => router.push('/chat')}
            className="text-xl font-bold cursor-pointer">ChartFlow AI
            </span>
        </div>
            <div className="space-x-4">
            {/* <button className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition">
                Log in
            </button>
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
                Sign up
            </button> */}
            </div>
        </header>
    )
}