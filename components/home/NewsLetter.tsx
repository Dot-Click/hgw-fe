"use client";

import React, { useState } from 'react';
import { InputGroup, Button, toast, Spinner } from "@heroui/react";

const NewsLetter = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!email || !email.includes('@')) {
            toast.danger('Please enter a valid email address.');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('/api/subscribers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, source: 'Home Newsletter' }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            toast.success('Welcome to the Vault! You have been subscribed.');
            setEmail('');
        } catch (error: any) {
            toast.danger(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="w-full max-w-7xl mx-auto px-4 py-10">
            <div className="relative w-full bg-[#0A0B0F] border border-[#00CCFF4D] rounded-[32px] p-5 md:p-6 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.3)]">
                {/* Background decorative glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-linear-to-r from-transparent via-[#00CCFF44] to-transparent" />
                
                <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
                    <h2 className="orbitron text-[18px] md:text-[30px] font-[700] tracking-wider text-[#E7EBEF] mb-4">
                        Stay in the <span className="text-[#00CCFF]">Vault</span>
                    </h2>
                    
                    <p className="outfit text-[#7B899D] text-sm md:text-[15px] leading-relaxed mb-6 opacity-80">
                        Subscribe for exclusive HGW analysis and new content
                    </p>

                    <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row w-full gap-4 items-center">
                        <InputGroup className="flex-1 w-full md:w-auto bg-[#16171D] border border-[#24262E] hover:border-[#00CCFF33] focus-within:border-[#00CCFF55]! transition-all duration-300 h-14 rounded-2xl px-3 flex items-center">
                            <InputGroup.Input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={loading}
                                className="bg-transparent outline-none w-full text-white outfit text-base placeholder:text-[#52525B]"
                            />
                        </InputGroup>
                        <Button 
                            type="submit"
                            isDisabled={loading}
                            className="bg-[#00CCFF] hover:bg-[#00CCFFEE] text-[#0A0B0F] orbitron font-bold text-base h-14 px-10 rounded-2xl transition-all duration-300 shadow-[0_0_20px_rgba(0,204,255,0.4)] hover:bg-[#05acd6] w-full md:w-auto flex items-center justify-center min-w-[160px]"
                        >
                            {loading ? <Spinner size="sm" color="current" /> : 'Subscribe'}
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default NewsLetter;