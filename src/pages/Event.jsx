import React from 'react';
// 1. Import Background
import CosmicBackground from '../components/Background/CosmicBackground';

// 2. Import Sections
import EventHero from '../components/Event/Sections/EventHero';
import EventList from '../components/Event/Sections/EventList';
// import EventCallToAction from '../components/Event/Sections/EventCallToAction';

export default function Event() {
    return (
        <main className="relative min-h-screen bg-[#02030A] text-white overflow-x-hidden">
            
            {/* Background Layer */}
            <CosmicBackground />
            
            {/* Overlay Gradient agar teks lebih terbaca di atas bintang */}
            <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/10 via-[#02030A]/80 to-[#02030A]" />

            {/* Content Layer */}
            <div className="relative z-10 pt-28 pb-20 px-6">
                <div className="max-w-6xl mx-auto space-y-20">
                    
                    {/* 1. Hero Event */}
                    <EventHero />

                    {/* 2. List Event */}
                    <EventList />

                    {/* 3. CTA
                    <EventCallToAction /> */}
                    
                </div>
            </div>
        </main>
    );
}