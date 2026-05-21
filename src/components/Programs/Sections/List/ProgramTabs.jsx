export default function ProgramTabs({ programsData, activeTab, setActiveTab }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-6 md:mb-10">
      {programsData.map((program) => (
        <button
          key={program.id}
          onClick={() => setActiveTab(program.id)}
          className={`px-4 py-2 md:px-6 md:py-2.5 rounded-full font-bold text-sm md:text-base transition-all duration-300 border ${
            activeTab === program.id
              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,255,255,0.4)]'
              : 'bg-[#0B0D21]/70 border-gray-700 text-gray-400 hover:border-cyan-400/50 hover:text-white'
          }`}
        >
          {program.tabLabel}
        </button>
      ))}
    </div>
  );
}