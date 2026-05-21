// src/components/Contact/Sections/ContactInfo.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CONTACT_INFO } from '/src/data/ContactData';

export default function ContactInfo() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setIsMapLoading(true);
      setTimeout(() => setRefreshKey((prev) => prev + 1), 1500);
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="space-y-8"
    >
      {/* Header Section */}
      <div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          Mari{' '}
          <span className="text-[#00D8FF] drop-shadow-[0_0_10px_rgba(0,216,255,0.4)]">
            Berkolaborasi
          </span>
        </h2>
        <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-lg">
          Punya pertanyaan tentang kelas atau tertarik membawa kurikulum
          robotika ke sekolah Anda? Kunjungi markas kami atau hubungi kami
          langsung!
        </p>
      </div>

      {/* Grid Kartu Info Kontak */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Kartu Alamat */}
        <a
          href={CONTACT_INFO.mapsLocation}
          target="_blank"
          rel="noreferrer"
          className="bg-[#09112A] border border-blue-900/40 p-6 rounded-[20px] flex flex-col gap-4 hover:border-red-500/50 transition-colors group cursor-pointer"
        >
          <span className="text-3xl text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)] group-hover:scale-110 transition-transform origin-left">
            📍
          </span>
          <div>
            <h4 className="text-white font-bold text-lg mb-1">Alamat Kami</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Jakarta Selatan, DKI Jakarta
              <br />
              Indonesia
            </p>
          </div>
        </a>

        {/* Kartu Email */}
        <a
          href={`mailto:${CONTACT_INFO.email}`}
          className="bg-[#09112A] border border-blue-900/40 p-6 rounded-[20px] flex flex-col gap-4 hover:border-blue-500/50 transition-colors group"
        >
          <span className="text-3xl text-blue-200 group-hover:scale-110 transition-transform origin-left">
            ✉️
          </span>
          <div>
            <h4 className="text-white font-bold text-lg mb-1">Email</h4>
            <p className="text-gray-400 text-sm">{CONTACT_INFO.email}</p>
          </div>
        </a>
      </div>

      {/* Maps dengan Loading Animation */}
      <div className="w-full h-64 sm:h-72 rounded-[20px] overflow-hidden border border-blue-900/40 shadow-lg relative group bg-[#09112A] flex items-center justify-center">
        <div className="absolute inset-0 pointer-events-none border border-cyan-500/0 rounded-[20px] z-10 group-hover:border-cyan-500/50 transition-colors duration-300" />

        {isOnline ? (
          <>
            {isMapLoading && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#09112A]">
                <div className="w-12 h-12 border-4 border-cyan-900 border-t-cyan-400 rounded-full animate-spin shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
                <p className="text-cyan-400 mt-4 animate-pulse font-mono text-sm tracking-widest">
                  MEMUAT PETA...
                </p>
              </div>
            )}
            <iframe
              key={refreshKey}
              onLoad={() => setIsMapLoading(false)}
              title="Peta Lokasi Tbotics"
              src={CONTACT_INFO.mapsLink}
              className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ${
                isMapLoading ? 'opacity-0' : 'opacity-100'
              }`}
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(100%)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-6 w-full h-full bg-[#09112A]">
            <span className="text-4xl block mb-3 opacity-80">🗺️🚫</span>
            <p className="text-gray-400 text-sm">
              Peta interaktif tidak tersedia dalam mode offline.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}