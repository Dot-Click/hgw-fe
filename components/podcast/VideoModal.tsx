"use client";

import React from 'react';
import { IoClose } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoModalProps {
    isOpen: boolean;
    onClose: () => void;
    videoUrl: string;
}

const VideoModal = ({ isOpen, onClose, videoUrl }: VideoModalProps) => {
    // Utility to convert YouTube URL to embed URL
    const getEmbedUrl = (url: string) => {
        if (!url) return '';
        
        // YouTube patterns
        const ytRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
        const match = url.match(ytRegex);
        
        if (match && match[1]) {
            return `https://www.youtube.com/embed/${match[1]}?autoplay=1`;
        }
        
        return url;
    };

    const embedUrl = getEmbedUrl(videoUrl);
    const isYoutube = embedUrl.includes('youtube.com/embed');

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/50 cursor-pointer"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,204,255,0.2)] border border-white/10"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-[#00CCFF] transition-all border border-white/10 group"
                        >
                            <IoClose size={24} className="group-hover:scale-110 transition-transform" />
                        </button>

                        {/* Video Content */}
                        <div className="w-full h-full">
                            {isYoutube ? (
                                <iframe
                                    src={embedUrl}
                                    title="Podcast Video"
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            ) : (
                                <video
                                    src={videoUrl}
                                    controls
                                    autoPlay
                                    className="w-full h-full"
                                />
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default VideoModal;
