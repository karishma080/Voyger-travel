import React from 'react';
import { Compass, Calendar, Globe, MapPin, DollarSign, Award, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap = {
  Compass: Compass,
  Calendar: Calendar,
  Globe: Globe,
  MapPin: MapPin,
  DollarSign: DollarSign,
  Award: Award
};

export default function OverviewCards({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
      {stats.map((stat, idx) => {
        const IconComponent = iconMap[stat.icon] || Compass;
        return (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className={`relative overflow-hidden rounded-3xl p-6 border backdrop-blur-2xl transition-all duration-300 glass-panel glass-panel-hover bg-gradient-to-br ${stat.gradient} ${stat.glowColor}`}
          >
            {/* Subtle Top-Right Ambient Glow Pill */}
            <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-cyan-400/10 blur-xl pointer-events-none" />

            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 light:text-slate-500">
                  {stat.title}
                </span>
                <h3 className="text-3xl lg:text-4xl font-black text-white light:text-slate-900 mt-2 tracking-tight font-display">
                  {stat.value}
                </h3>
              </div>
              <div className={`p-3.5 rounded-2xl bg-white/10 dark:bg-white/10 light:bg-slate-900/10 border border-white/20 dark:border-white/20 light:border-slate-900/10 ${stat.iconColor} shadow-lg backdrop-blur-md`}>
                <IconComponent className="w-6 h-6" />
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 light:border-slate-900/10 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 light:text-emerald-600 bg-emerald-500/15 light:bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                <TrendingUp className="w-3 h-3" />
                {stat.growth}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
