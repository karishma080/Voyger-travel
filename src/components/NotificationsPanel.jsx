import React, { useState } from 'react';
import { Bell, CheckCircle2, Trash2, Filter, AlertCircle, Plane, Hotel, Tag, Sun, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotificationsPanel({ notifications, onMarkAllRead, onToggleRead, onDeleteNotification }) {
  const [filter, setFilter] = useState('All');

  const filtered = notifications.filter(n => {
    if (filter === 'Unread') return !n.read;
    return true;
  });

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'Urgent': return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
      case 'Info': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      case 'Promo': return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'Weather': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  return (
    <div className="rounded-3xl border border-white/15 dark:border-white/15 light:border-slate-200 glass-panel p-6 space-y-6">
      
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-white light:text-slate-900 font-display">
            Notifications Center
          </h3>
          <p className="text-xs text-slate-400 light:text-slate-500 mt-0.5">
            Flight alerts, hotel check-ins, weather updates & promotional offers
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center p-1 rounded-2xl bg-white/5 dark:bg-white/5 light:bg-slate-100 border border-white/10 dark:border-white/10 light:border-slate-300 text-xs">
            {['All', 'Unread'].map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all ${
                  filter === tab
                    ? 'bg-cyan-500 text-slate-950 shadow-glow-cyan'
                    : 'text-slate-400 hover:text-white light:text-slate-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <button
            onClick={onMarkAllRead}
            className="px-3.5 py-2 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-cyan-400 font-semibold flex items-center gap-1.5 transition-all"
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> Mark All Read
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.length > 0 ? (
          filtered.map((notif, index) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-4 ${
                !notif.read
                  ? 'bg-cyan-500/10 border-cyan-500/30 shadow-glow-cyan/10'
                  : 'bg-white/5 dark:bg-white/5 light:bg-slate-100/70 border-white/10 dark:border-white/10 light:border-slate-200'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className={`p-3 rounded-2xl ${notif.read ? 'bg-white/5 text-slate-400' : 'bg-cyan-500/20 text-cyan-400'}`}>
                  <Bell className="w-5 h-5" />
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-sm text-white light:text-slate-900">
                      {notif.title}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold border ${getBadgeColor(notif.badge)}`}>
                      {notif.badge}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 light:text-slate-600 leading-relaxed">
                    {notif.message}
                  </p>

                  <span className="text-[10px] text-slate-400 block pt-1">
                    {notif.time}
                  </span>
                </div>
              </div>

              {/* Individual Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onToggleRead(notif.id)}
                  className={`p-2 rounded-xl text-xs transition-all ${
                    notif.read
                      ? 'text-slate-500 hover:text-cyan-400'
                      : 'text-cyan-400 hover:text-white bg-cyan-500/20'
                  }`}
                  title={notif.read ? "Mark as unread" : "Mark as read"}
                >
                  <CheckCircle2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDeleteNotification(notif.id)}
                  className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
                  title="Delete notification"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </motion.div>
          ))
        ) : (
          <div className="py-12 text-center text-slate-400 text-xs space-y-2">
            <Bell className="w-8 h-8 text-slate-500 mx-auto opacity-50" />
            <p>No notifications found in this view.</p>
          </div>
        )}
      </div>

    </div>
  );
}
