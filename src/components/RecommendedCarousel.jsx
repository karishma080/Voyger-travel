import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, ArrowUpRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RecommendedCarousel({ items, onExplore }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="rounded-3xl border border-white/15 dark:border-white/15 light:border-slate-200 glass-panel p-6 space-y-5">
      
      {/* Header with Navigation Controls */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-white light:text-slate-900 font-display">
              Recommended Destinations
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" /> Curated for You
            </span>
          </div>
          <p className="text-xs text-slate-400 light:text-slate-500 mt-0.5">
            Hand-picked luxury travel recommendations matching your preferences
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-2.5 rounded-2xl bg-white/5 dark:bg-white/5 light:bg-slate-100 border border-white/10 dark:border-white/10 light:border-slate-300 text-slate-300 hover:text-cyan-400 hover:bg-white/10 transition-all"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2.5 rounded-2xl bg-white/5 dark:bg-white/5 light:bg-slate-100 border border-white/10 dark:border-white/10 light:border-slate-300 text-slate-300 hover:text-cyan-400 hover:bg-white/10 transition-all"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel */}
      <div 
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto pb-3 pt-1 scroll-smooth snap-x snap-mandatory scrollbar-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ y: -5 }}
            className="w-72 sm:w-80 flex-shrink-0 snap-start rounded-3xl border border-white/15 dark:border-white/15 light:border-slate-200 glass-panel overflow-hidden flex flex-col justify-between group"
          >
            {/* Image Banner */}
            <div className="relative h-44 overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-black/30" />

              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-cyan-500/80 backdrop-blur-md text-[10px] font-bold text-slate-950 uppercase tracking-wider">
                {item.tag}
              </div>

              <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-xs font-bold text-white border border-white/20">
                <span>{item.flag}</span>
                <span>{item.country}</span>
              </div>
            </div>

            {/* Body Info */}
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-white light:text-slate-900 text-sm font-display truncate">
                  {item.name}
                </h4>
                <div className="flex items-center gap-1 text-amber-400 font-bold text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{item.rating}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10 light:border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-400 block">From</span>
                  <span className="text-base font-black text-cyan-400 font-display">{item.price}</span>
                </div>

                <button
                  onClick={() => onExplore(item)}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-glow-cyan flex items-center gap-1 transition-all"
                >
                  <span>Explore</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}
