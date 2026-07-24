import React, { useState, useEffect } from 'react';
import { 
  Calendar, Users, Hotel, Plane, Clock, Eye, Sparkles, MapPin, 
  Sun, CheckCircle2, ChevronRight, ShieldCheck 
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function UpcomingTripCard({ trip, onViewDetails }) {
  // Live ticking countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: trip.daysLeft,
    hours: trip.hoursLeft,
    minutes: 42,
    seconds: 15
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-3xl border border-white/20 dark:border-white/20 light:border-cyan-900/15 shadow-2xl glass-panel group"
    >
      {/* Background Destination Banner Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={trip.image}
          alt={trip.destination}
          className="w-full h-full object-cover object-center scale-105 group-hover:scale-100 transition-transform duration-700 brightness-[0.4] dark:brightness-[0.35] light:brightness-[0.45]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/90 via-[#0A1628]/40 to-transparent" />
      </div>

      {/* Card Content Overlay */}
      <div className="relative z-10 p-6 lg:p-8 text-white space-y-6">
        
        {/* Header Row */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 backdrop-blur-md flex items-center gap-1.5 shadow-glow-cyan">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-spin-slow" /> Next Upcoming Journey
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 backdrop-blur-md flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> {trip.status}
            </span>
          </div>

          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-xs text-amber-300 font-semibold">
            <Sun className="w-4 h-4 text-amber-400" />
            <span>{trip.weather}</span>
          </div>
        </div>

        {/* Title & Location */}
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-sm font-medium">
            <MapPin className="w-4 h-4" />
            <span>{trip.country} {trip.flag}</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-black tracking-tight text-white mt-1 font-display">
            {trip.destination}
          </h2>
        </div>

        {/* Countdown Ticker Bar */}
        <div className="p-4 rounded-2xl bg-white/10 dark:bg-white/10 light:bg-slate-900/40 backdrop-blur-xl border border-white/15 max-w-xl">
          <div className="flex items-center justify-between gap-2 text-center text-white">
            <div className="flex-1">
              <div className="text-2xl lg:text-3xl font-black text-cyan-400 font-display">{timeLeft.days}</div>
              <div className="text-[10px] uppercase font-extrabold tracking-wider text-slate-300">Days</div>
            </div>
            <span className="text-cyan-400 text-xl font-bold font-display">:</span>
            <div className="flex-1">
              <div className="text-2xl lg:text-3xl font-black text-cyan-400 font-display">{String(timeLeft.hours).padStart(2, '0')}</div>
              <div className="text-[10px] uppercase font-extrabold tracking-wider text-slate-300">Hours</div>
            </div>
            <span className="text-cyan-400 text-xl font-bold font-display">:</span>
            <div className="flex-1">
              <div className="text-2xl lg:text-3xl font-black text-cyan-400 font-display">{String(timeLeft.minutes).padStart(2, '0')}</div>
              <div className="text-[10px] uppercase font-extrabold tracking-wider text-slate-300">Mins</div>
            </div>
            <span className="text-cyan-400 text-xl font-bold font-display">:</span>
            <div className="flex-1">
              <div className="text-2xl lg:text-3xl font-black text-cyan-400 font-display">{String(timeLeft.seconds).padStart(2, '0')}</div>
              <div className="text-[10px] uppercase font-extrabold tracking-wider text-slate-300">Secs</div>
            </div>
          </div>
        </div>

        {/* Key Trip Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 space-y-1">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" /> Travel Date
            </div>
            <div className="font-bold text-white text-xs lg:text-sm">{trip.startDate}</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 space-y-1">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Users className="w-3.5 h-3.5 text-cyan-400" /> Travelers
            </div>
            <div className="font-bold text-white text-xs lg:text-sm">{trip.travelers}</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 space-y-1">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Hotel className="w-3.5 h-3.5 text-cyan-400" /> Hotel Stay
            </div>
            <div className="font-bold text-white text-xs lg:text-sm truncate">{trip.hotelName}</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 space-y-1">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Plane className="w-3.5 h-3.5 text-cyan-400" /> Flight No.
            </div>
            <div className="font-bold text-white text-xs lg:text-sm">{trip.flightNumber}</div>
          </div>
        </div>

        {/* Action Button Row */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Travel Insurance & Boarding Pass Ready</span>
          </div>

          <button
            onClick={() => onViewDetails(trip)}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs tracking-wide shadow-glow-cyan flex items-center gap-2 transform hover:scale-105 transition-all"
          >
            <Eye className="w-4 h-4" /> View Full Itinerary & Boarding Pass
          </button>
        </div>

      </div>
    </motion.div>
  );
}
