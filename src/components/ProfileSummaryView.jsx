import React from 'react';
import { User, Mail, Award, Globe, MapPin, Compass, Edit3, Shield, Star, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProfileSummaryView({ userData, onEditProfile }) {
  return (
    <div className="rounded-3xl border border-white/15 dark:border-white/15 light:border-slate-200 glass-panel overflow-hidden space-y-6">
      
      {/* Cover Image Banner */}
      <div className="relative h-56 sm:h-64 overflow-hidden">
        <img
          src={userData.coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/40 to-transparent" />
        
        <button
          onClick={onEditProfile}
          className="absolute top-4 right-4 px-4 py-2 rounded-2xl bg-black/60 backdrop-blur-md hover:bg-cyan-500 hover:text-slate-950 text-white font-bold text-xs border border-white/20 transition-all flex items-center gap-1.5 shadow-lg"
        >
          <Edit3 className="w-3.5 h-3.5" /> Edit Profile
        </button>
      </div>

      {/* Profile Header Info */}
      <div className="px-6 lg:px-8 -mt-20 relative z-10 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="flex items-end gap-4">
            <div className="relative">
              <img
                src={userData.avatar}
                alt={userData.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover ring-4 ring-[#0A1628] shadow-2xl"
              />
              <span className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-cyan-500 text-slate-950 shadow-glow-cyan">
                <CheckCircle2 className="w-4 h-4" />
              </span>
            </div>

            <div className="space-y-1 mb-1">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-black text-white light:text-slate-900 font-display">
                  {userData.name}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  👑 VIP Platinum
                </span>
              </div>
              <p className="text-xs text-slate-400 light:text-slate-600 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-cyan-400" /> {userData.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-white/5 dark:bg-white/5 light:bg-slate-100 border border-white/10 text-center min-w-[100px]">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Reward Points</span>
              <span className="text-lg font-black text-cyan-400 font-display">{userData.rewardPoints.toLocaleString()}</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 dark:bg-white/5 light:bg-slate-100 border border-white/10 text-center min-w-[100px]">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Countries</span>
              <span className="text-lg font-black text-emerald-400 font-display">{userData.countriesVisitedCount}</span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="p-4 rounded-2xl bg-white/5 dark:bg-white/5 light:bg-slate-100/70 border border-white/10 dark:border-white/10 light:border-slate-200 text-xs text-slate-300 light:text-slate-700 leading-relaxed">
          {userData.bio}
        </div>

        {/* Countries Visited Badge Gallery */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-cyan-400" /> Countries Visited Passport ({userData.countriesVisitedList.length})
            </h4>
            <span className="text-[11px] text-cyan-400 font-semibold">+ Explore More</span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {userData.countriesVisitedList.map((c, i) => (
              <div 
                key={i}
                className="px-3 py-1.5 rounded-2xl bg-white/5 dark:bg-white/5 light:bg-slate-100 border border-white/10 dark:border-white/10 light:border-slate-200 text-xs font-semibold text-white light:text-slate-900 flex items-center gap-2 hover:border-cyan-400 transition-all cursor-default"
              >
                <span className="text-base">{c.flag}</span>
                <span>{c.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pb-6" />
      </div>

    </div>
  );
}
