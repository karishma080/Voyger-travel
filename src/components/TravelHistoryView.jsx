import React from 'react';
import { History, Calendar, Star, DollarSign, Clock, MapPin, CheckCircle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TravelHistoryView({ historyData, onRebook }) {
  return (
    <div className="rounded-3xl border border-white/15 dark:border-white/15 light:border-slate-200 glass-panel p-6 space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white light:text-slate-900 font-display">
          Travel History & Past Trips Archive
        </h3>
        <p className="text-xs text-slate-400 light:text-slate-500 mt-0.5">
          Relive your past luxury vacations, ratings given & travel itineraries
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {historyData.map((trip, idx) => (
          <motion.div
            key={trip.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className="rounded-3xl border border-white/10 dark:border-white/10 light:border-slate-200 glass-panel overflow-hidden flex flex-col justify-between group hover:border-cyan-400/40 transition-all"
          >
            <div className="relative h-40 overflow-hidden">
              <img
                src={trip.image}
                alt={trip.destination}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-black/40 to-transparent" />

              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs font-bold text-white border border-white/20">
                <span>{trip.flag}</span>
                <span>{trip.country}</span>
              </div>

              <div className="absolute top-3 right-3 flex items-center gap-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{trip.rating} / 5</span>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h4 className="text-lg font-extrabold text-white light:text-slate-900 font-display">
                  {trip.destination}
                </h4>

                <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-300 light:text-slate-600">
                  <span className="flex items-center gap-1 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" /> {trip.date}
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" /> {trip.duration}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-white/10 light:border-slate-200">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Trip Highlights
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {trip.highlights.map((h, i) => (
                    <span key={i} className="px-2.5 py-0.5 rounded-full text-[11px] bg-white/5 dark:bg-white/5 light:bg-slate-100 text-slate-300 light:text-slate-700 border border-white/10 light:border-slate-200">
                      • {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/10 light:border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-400 block">Total Spent</span>
                  <span className="text-base font-extrabold text-emerald-400 font-display">{trip.cost}</span>
                </div>

                <button
                  onClick={() => onRebook(trip)}
                  className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500 text-cyan-400 hover:text-slate-950 border border-cyan-500/30 font-bold text-xs transition-all flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Rebook Trip
                </button>
              </div>

            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
