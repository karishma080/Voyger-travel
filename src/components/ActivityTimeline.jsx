import React from 'react';
import { Plane, Building, ShieldCheck, Heart, Star, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap = {
  Plane: Plane,
  Building: Building,
  ShieldCheck: ShieldCheck,
  Heart: Heart,
  Star: Star
};

export default function ActivityTimeline({ activities }) {
  return (
    <div className="rounded-3xl border border-white/15 dark:border-white/15 light:border-slate-200 glass-panel p-6 space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white light:text-slate-900 font-display">
          Travel Activity Timeline
        </h3>
        <p className="text-xs text-slate-400 light:text-slate-500 mt-0.5">
          Real-time record of your travel updates, visa approvals & bookings
        </p>
      </div>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-white/10 dark:before:bg-white/10 light:before:bg-slate-300">
        {activities.map((act, index) => {
          const IconComponent = iconMap[act.icon] || CheckCircle;
          return (
            <motion.div
              key={act.id}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              className="relative group"
            >
              {/* Timeline Dot Indicator */}
              <div className="absolute -left-[31px] top-1 w-6 h-6 rounded-full bg-[#0A1628] border-2 border-cyan-400 flex items-center justify-center text-cyan-400 shadow-glow-cyan">
                <IconComponent className="w-3 h-3" />
              </div>

              {/* Activity Card */}
              <div className="p-4 rounded-2xl bg-white/5 dark:bg-white/5 light:bg-slate-100 border border-white/10 dark:border-white/10 light:border-slate-200 hover:border-cyan-500/40 transition-all space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-bold text-sm text-white light:text-slate-900">
                    {act.title}
                  </span>
                  <span className="text-[10px] text-cyan-400 font-medium px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                    {act.timestamp}
                  </span>
                </div>

                <p className="text-xs text-slate-300 light:text-slate-600 leading-relaxed">
                  {act.details}
                </p>

                <div className="flex items-center gap-2 pt-2 text-[10px] text-slate-400">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span>Recorded on {act.date}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
