import { memo } from 'react';
import FadeIn from '../../UI/FadeIn';
import Counter from '../../UI/Counter';
import { STATS } from '../../../data/HomeData';

const StatsStrip = memo(function StatsStrip() {
  return (
    <FadeIn y={30}>
      <div className="relative z-20 max-w-6xl mx-auto px-5 -mt-6 lg:-mt-16 mb-16 lg:mb-24">
        <div className="w-full bg-[#02050f]/80 border border-cyan-900/40 rounded-2xl lg:rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.12)]">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/10">
            {STATS.map((s, i) => <Counter key={i} {...s} />)}
          </div>
        </div>
      </div>
    </FadeIn>
  );
});

export default StatsStrip;