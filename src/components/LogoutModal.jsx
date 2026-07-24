import React from 'react';
import { X, LogOut, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LogoutModal({ onClose, onConfirm }) {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative w-full max-w-sm rounded-3xl bg-[#0F172A] border border-white/20 shadow-2xl p-6 text-slate-200 text-center space-y-4"
        >
          <div className="w-14 h-14 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-7 h-7" />
          </div>

          <div>
            <h3 className="text-xl font-bold text-white font-display">Log Out of Voyger</h3>
            <p className="text-xs text-slate-400 mt-1">
              Are you sure you want to log out of your travel assistant dashboard?
            </p>
          </div>

          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={onClose}
              className="w-1/2 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-slate-300"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="w-1/2 py-2.5 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-lg flex items-center justify-center gap-1.5"
            >
              <LogOut className="w-4 h-4" /> Log Out
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
