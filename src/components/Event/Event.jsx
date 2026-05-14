import React from 'react';

export default function Event() {
    return (
        <main className="relative z-10 text-white min-h-screen pt-28 pb-20 px-6 flex flex-col items-center justify-center">
            <section id="event" className="relative py-20 px-6 z-10 text-white min-h-[50vh] flex items-center justify-center">

                {/* ini bagian background (jika nanti mau ditambah efek/gambar) */}
                <div className="absolute inset-0 z-0 pointer-events-none"></div>

                {/* bagian content */}
                <div className="relative z-10 text-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_15px_rgba(0,209,255,0.5)]">
                        Ini Halaman Event
                    </h2>
                    <p className="text-gray-400 mt-4">Nantikan event seru dari Tbotics Education!</p>
                </div>

            </section>
        </main>
    );
}