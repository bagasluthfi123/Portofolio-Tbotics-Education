import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { YOUTUBE_ID } from '../../data/HomeData';
import videoLokal from '../../assets/video-lokal-tbotics-2026.mp4';

// ==========================================
// PENGATURAN UTAMA
// Ubah ke `true` jika suatu saat video lokal ingin digunakan lagi
// ==========================================
const ENABLE_LOCAL = false; 

export default function VideoPlayer() {
  // Jika ENABLE_LOCAL false, paksa mode ke 'youtube'
  const [mode, setMode] = useState(ENABLE_LOCAL ? 'local' : 'youtube');

  return (
    <div
      className="relative rounded-2xl lg:rounded-3xl overflow-hidden border-2 border-cyan-900/30 bg-[#080d1e]"
      style={{ boxShadow: '0 0 40px rgba(34,211,238,0.08), 0 0 80px rgba(34,211,238,0.04)' }}
    >
      {/* Sudut dekorasi UI */}
      {[
        'top-2.5 left-2.5 border-t-2 border-l-2 border-cyan-400/60',
        'top-2.5 right-2.5 border-t-2 border-r-2 border-cyan-400/60',
        'bottom-2.5 left-2.5 border-b-2 border-l-2 border-cyan-400/25',
        'bottom-2.5 right-2.5 border-b-2 border-r-2 border-cyan-400/25',
      ].map((cls, i) => (
        <div key={i} className={`absolute w-4 h-4 z-20 pointer-events-none ${cls}`} />
      ))}

      {/* Scanline UI */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: 'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(34,211,238,0.025) 3px,rgba(34,211,238,0.025) 4px)' }}
      />

      {/* Top bar & Mode Switcher (Hanya muncul jika ENABLE_LOCAL = true) */}
      <div
        className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 pt-3 pb-6 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom,rgba(8,13,30,0.95),transparent)' }}
      >
        <div className="pointer-events-auto">
          {ENABLE_LOCAL && (
            <div className="flex items-center gap-1 p-1 rounded-full bg-black/60 border border-white/10">
              {[
                { id: 'local', icon: '📁', label: 'Lokal', activeClass: 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50' },
                { id: 'youtube', icon: '▶', label: 'YouTube', activeClass: 'bg-red-500/20 text-red-400 border border-red-500/50' },
              ].map(btn => (
                <button
                  key={btn.id}
                  onClick={() => setMode(btn.id)}
                  className={`px-3 py-1 rounded-full font-mono text-[0.55rem] font-black uppercase tracking-wider transition-all duration-200 ${
                    mode === btn.id ? btn.activeClass : 'text-gray-500 hover:text-gray-300 border border-transparent'
                  }`}
                >
                  {btn.icon} {btn.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Konten Player */}
      <AnimatePresence mode="wait">
        {mode === 'local' && ENABLE_LOCAL ? (
          <LocalPlayer key="local" onFallback={() => setMode('youtube')} />
        ) : (
          <YouTubePlayer key="youtube" />
        )}
      </AnimatePresence>

      {/* Footer Info */}
      <div className="px-4 py-3 bg-[#080d1e] border-t border-white/5 relative z-20">
        <h3 className="text-white font-bold text-sm sm:text-base flex items-center gap-2 font-mono">
          <span className="text-cyan-400 animate-pulse text-xs">▹</span>
          Belajar Sambil Bermain
        </h3>
        <p className="text-cyan-200/45 text-xs mt-0.5 font-mono tracking-wide">
          Status: Mengudara menuju masa depan... 🚀
        </p>
      </div>
    </div>
  );
}

// ==========================================
// SUB-KOMPONEN: YOUTUBE PLAYER
// ==========================================
function YouTubePlayer() {
  const [ytMuted, setYtMuted] = useState(false);
  const iframeRef = useRef(null);

  const toggleMuteYoutube = () => {
    if (!iframeRef.current) return;
    const next = !ytMuted;
    iframeRef.current.contentWindow.postMessage(
      JSON.stringify({ event: 'command', func: next ? 'mute' : 'unMute', args: [] }),
      '*'
    );
    setYtMuted(next);
  };

  const ytSrc = `https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&mute=0&loop=1&playlist=${YOUTUBE_ID}&rel=0&modestbranding=1&controls=1&enablejsapi=1`;

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
      className="relative w-full h-[280px] sm:h-[360px] lg:h-[420px]"
    >
      {/* Tombol Mute Kustom untuk YouTube ditaruh di dalam komponennya sendiri */}
      <div className="absolute top-3 right-4 z-40">
        <motion.button
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}
          onClick={toggleMuteYoutube}
          className="flex items-center gap-1.5 bg-black/65 border border-white/20 rounded-full px-3 py-1.5 text-white/70 hover:text-white hover:border-white/40 transition-all"
        >
          <span className="text-sm">{ytMuted ? '🔇' : '🔊'}</span>
          <span className="font-mono text-[0.5rem] font-black uppercase tracking-wider">
            {ytMuted ? 'Muted' : 'Sound On'}
          </span>
        </motion.button>
      </div>

      <iframe
        ref={iframeRef}
        src={ytSrc}
        title="Tbotics Education Video"
        allow="autoplay; fullscreen"
        allowFullScreen
        className="w-full h-full"
        style={{ border: 'none' }}
      />
    </motion.div>
  );
}

// ==========================================
// SUB-KOMPONEN: LOCAL PLAYER
// Semua logika state video lokal diisolasi di sini
// ==========================================
function LocalPlayer({ onFallback }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    isPlaying ? videoRef.current.pause() : videoRef.current.play();
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const next = !isMuted;
    videoRef.current.muted = next;
    setIsMuted(next);
  };

  const handleSkip = (sec) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime + sec);
  };

  const handleSeek = (e) => {
    if (!videoRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    videoRef.current.currentTime = ((e.clientX - rect.left) / rect.width) * duration;
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const cur = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 0;
    setCurrentTime(cur);
    setDuration(dur);
    setProgress(dur ? (cur / dur) * 100 : 0);
  };

  const formatTime = (sec) => {
    if (isNaN(sec)) return '0:00';
    return `${Math.floor(sec / 60)}:${Math.floor(sec % 60).toString().padStart(2, '0')}`;
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="relative">
      
      {/* Indikator LIVE FEED */}
      <div className="absolute top-3 right-4 z-40 flex items-center gap-1.5 bg-black/65 border border-red-500/45 rounded-full px-3 py-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_#ef4444]" />
        <span className="text-red-400 font-mono text-[0.55rem] tracking-[0.15em] font-black">LIVE FEED</span>
      </div>

      <video
        ref={videoRef}
        src={videoLokal}
        muted loop playsInline
        onError={() => { setHasError(true); onFallback(); }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        className="w-full h-[280px] sm:h-[360px] lg:h-[420px] object-cover"
      />
      
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to top,#080d1e,transparent)' }} />
      
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0f1d]/90 z-20 gap-3">
          <span className="text-4xl">⚠️</span>
          <p className="text-gray-400 font-mono text-xs text-center px-6">
            Video lokal tidak ditemukan.<br />Beralih ke YouTube.
          </p>
          <motion.button whileHover={{ scale: 1.05 }} onClick={onFallback}
            className="px-4 py-2 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 font-mono text-xs font-bold">
            ▶ Tonton di YouTube
          </motion.button>
        </div>
      )}

      {/* Control Bar Video Lokal */}
      <div className="relative z-30 px-4 pt-3 pb-4 bg-[#080d1e] border-t border-cyan-900/20">
        <div className="flex items-center gap-2.5 mb-3">
          <span className="text-[0.6rem] text-white/30 font-mono w-8 shrink-0">{formatTime(currentTime)}</span>
          <div onClick={handleSeek} className="flex-1 h-1 bg-white/10 rounded-full cursor-pointer relative group/bar">
            <div
              className="h-full rounded-full relative transition-all"
              style={{ width: `${progress}%`, background: 'linear-gradient(to right,#22d3ee,#818cf8)' }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] opacity-0 group-hover/bar:opacity-100 transition-opacity" />
            </div>
          </div>
          <span className="text-[0.6rem] text-white/30 font-mono w-8 shrink-0 text-right">{formatTime(duration)}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}
              onClick={() => handleSkip(-10)}
              className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-cyan-400 transition-all text-xs font-mono font-bold">
              ↺10
            </motion.button>

            <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}
              onClick={togglePlay}
              className="w-9 h-9 rounded-xl bg-cyan-400/15 border border-cyan-400/40 flex items-center justify-center text-cyan-400 hover:bg-cyan-400/25 transition-all">
              <span className="text-sm">{isPlaying ? '⏸' : '▶'}</span>
            </motion.button>

            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}
              onClick={() => handleSkip(10)}
              className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-cyan-400 transition-all text-xs font-mono font-bold">
              10↻
            </motion.button>

            <div className="w-px h-5 bg-white/10 mx-1" />

            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}
              onClick={toggleMute}
              className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all">
              <span className="text-sm">{isMuted ? '🔇' : '🔊'}</span>
            </motion.button>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:flex items-center gap-1.5 bg-cyan-400/8 border border-cyan-400/20 rounded-full px-2.5 py-1 text-[0.55rem] text-cyan-400/70 font-mono tracking-wider">HD</span>
            <button onClick={onFallback}
              className="text-[0.55rem] text-gray-600 hover:text-red-400 font-mono uppercase tracking-widest transition-colors">
              YT ↗
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}