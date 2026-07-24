import React from 'react';
import { Star, Heart, MapPin, Calendar, DollarSign, Compass, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SavedDestinationsGrid({ destinations, onToggleWishlist, onExplore }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-white light:text-slate-900 font-display">
            Saved Wishlist Destinations
          </h3>
          <p className="text-xs text-slate-400 light:text-slate-500 mt-0.5">
            Your bookmarked dream spots and luxury travel destinations
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((dest, index) => (
          <motion.div
            key={dest.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            whileHover={{ y: -6 }}
            className="rounded-3xl border border-white/15 dark:border-white/15 light:border-slate-200 glass-panel overflow-hidden flex flex-col justify-between group"
          >
            {/* Top Image Banner */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-black/30" />

              {/* Wishlist Heart Button */}
              <button
                onClick={() => onToggleWishlist(dest.id)}
                className={`absolute top-3.5 right-3.5 p-2.5 rounded-full backdrop-blur-md transition-all ${
                  dest.isWishlisted
                    ? 'bg-rose-500/80 text-white border border-rose-400 shadow-lg scale-110'
                    : 'bg-black/40 text-slate-300 hover:text-white border border-white/20'
                }`}
                aria-label="Toggle wishlist"
              >
                <Heart className={`w-4 h-4 ${dest.isWishlisted ? 'fill-current' : ''}`} />
              </button>

              {/* Country Badge */}
              <div className="absolute bottom-3 left-3.5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-xs font-bold text-white border border-white/20">
                <span>{dest.flag}</span>
                <span>{dest.country}</span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-extrabold text-white light:text-slate-900 font-display">
                    {dest.name}
                  </h4>
                  <div className="flex items-center gap-1 text-amber-400 font-bold text-xs bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{dest.rating}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 light:text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                  {dest.description}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/10 light:border-slate-200 text-xs">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" /> Best Season
                  </span>
                  <span className="font-semibold text-slate-200 light:text-slate-800">{dest.season}</span>
                </div>

                <div className="flex items-center justify-between text-slate-400">
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Est. Cost
                  </span>
                  <span className="font-bold text-emerald-400 text-sm">{dest.cost}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onExplore(dest)}
                className="w-full py-2.5 rounded-2xl bg-white/5 dark:bg-white/5 light:bg-slate-100 hover:bg-cyan-500 hover:text-slate-950 border border-white/15 light:border-slate-300 font-bold text-xs transition-all flex items-center justify-center gap-1.5 group-hover:border-cyan-400"
              >
                <span>Explore Destination</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
