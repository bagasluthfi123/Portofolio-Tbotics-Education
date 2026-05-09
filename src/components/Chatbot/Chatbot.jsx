import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  

  // State untuk menyimpan riwayat chat
  const [messages, setMessages] = useState([
    { 
      sender: 'bot', 
      text: 'Halo! Aku asisten virtual Tbotics 🤖. Ada yang bisa dibantu tentang program robotika kami?' 
    }
  ]);

  // Fungsi untuk scroll otomatis ke pesan terbawah
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Fungsi untuk menangani saat pesan dikirim
  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // 1. Masukkan pesan dari User
    setMessages((prev) => [...prev, { sender: 'user', text: input }]);
    setInput('');

    // 2. Simulasi bot membalas setelah jeda 1 detik (Bisa diganti logika AI nanti)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev, 
        { 
          sender: 'bot', 
          text: 'Terima kasih atas pesannya! Untuk respon lebih cepat mengenai pendaftaran atau detail program, yuk langsung ngobrol dengan Admin kami via WhatsApp! 🚀' 
        }
      ]);
    }, 1000);
  };

  // Fungsi untuk tombol WhatsApp di dalam chat
  const handleWhatsApp = () => {
    const waNumber = "6285162534164";
    const waMessage = "Halo Admin Tbotics, saya butuh bantuan dari website.";
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      
      {/* ===== WINDOW CHAT ===== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="w-[320px] sm:w-[380px] bg-[#0B0D21] border border-cyan-500/30 rounded-2xl shadow-[0_0_40px_rgba(34,211,238,0.15)] flex flex-col overflow-hidden mb-4"
          >
            {/* Header Chat */}
            <div className="bg-gradient-to-r from-cyan-900/80 to-blue-900/80 p-4 flex justify-between items-center border-b border-cyan-500/30">
              <div className="flex items-center gap-3">
                <div className="bg-cyan-500/20 p-2 rounded-full border border-cyan-400/50">
                  <Bot size={20} className="text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">Tbotics Assistant</h3>
                  <p className="text-cyan-400 text-xs flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span> Online
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Area Pesan */}
            <div className="h-80 p-4 overflow-y-auto flex flex-col gap-4 bg-[#02030A]/50">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    
                    {/* Avatar Chat */}
                    <div className="flex-shrink-0 mt-1">
                      {msg.sender === 'user' ? (
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                          <User size={14} />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-[#0B0D21] border border-cyan-500/50 flex items-center justify-center text-cyan-400">
                          <Bot size={14} />
                        </div>
                      )}
                    </div>

                    {/* Balon Chat */}
                    <div 
                      className={`p-3 rounded-2xl text-sm leading-relaxed ${
                        msg.sender === 'user' 
                          ? 'bg-blue-600 text-white rounded-tr-sm' 
                          : 'bg-[#151B3B] border border-gray-700 text-gray-200 rounded-tl-sm'
                      }`}
                    >
                      {msg.text}
                      
                      {/* Tampilkan tombol WA khusus di balasan bot terakhir (opsional) */}
                      {msg.sender === 'bot' && index > 0 && (
                        <button 
                          onClick={handleWhatsApp}
                          className="mt-3 w-full bg-cyan-500/20 hover:bg-cyan-500 hover:text-gray-900 border border-cyan-400 text-cyan-400 text-xs font-bold py-2 rounded-lg transition-all cursor-pointer"
                        >
                          Hubungi via WhatsApp
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {/* Dummy div untuk auto-scroll */}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Chat */}
            <form onSubmit={handleSend} className="p-3 border-t border-cyan-900/50 bg-[#0B0D21] flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ketik pesan..."
                className="flex-1 bg-[#02030A] border border-gray-700 text-white text-sm rounded-xl px-4 py-2 focus:outline-none focus:border-cyan-500 transition-colors"
              />
              <button 
                type="submit"
                disabled={!input.trim()}
                className="bg-cyan-500 hover:bg-cyan-400 disabled:bg-gray-700 disabled:text-gray-500 text-[#0B0D21] p-3 rounded-xl transition-colors cursor-pointer flex items-center justify-center"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== TOMBOL TOGGLE FLOATING ===== */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-cyan-500 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.5)] flex items-center justify-center text-[#020b2d] cursor-pointer border-2 border-transparent hover:border-white transition-all relative"
      >
        {/* Efek Ping (Radar) di belakang tombol agar menarik perhatian */}
        {!isOpen && (
          <span className="absolute w-full h-full rounded-full bg-cyan-400 opacity-50 animate-ping z-[-1]"></span>
        )}
        
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </motion.button>

    </div>
  );
}