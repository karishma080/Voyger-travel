import React, { useState } from 'react';
import { X, Lock, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChangePasswordModal({ onClose, onSuccess }) {
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPass !== confirmPass) {
      setError('New passwords do not match!');
      return;
    }
    if (newPass.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    onSuccess();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative w-full max-w-md rounded-3xl bg-[#0F172A] border border-white/20 shadow-2xl p-6 text-slate-200 space-y-5"
        >
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="text-lg font-bold text-white font-display">Change Password</h3>
            <button onClick={onClose} className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-500/20 text-rose-400 text-xs border border-rose-500/30">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="text-slate-400 block mb-1 font-semibold">Current Password</label>
              <input
                type="password"
                value={currentPass}
                onChange={(e) => { setCurrentPass(e.target.value); setError(''); }}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-white/10 border border-white/15 text-white focus:outline-none focus:border-cyan-400"
                required
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1 font-semibold">New Password</label>
              <input
                type="password"
                value={newPass}
                onChange={(e) => { setNewPass(e.target.value); setError(''); }}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-white/10 border border-white/15 text-white focus:outline-none focus:border-cyan-400"
                required
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1 font-semibold">Confirm New Password</label>
              <input
                type="password"
                value={confirmPass}
                onChange={(e) => { setConfirmPass(e.target.value); setError(''); }}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-white/10 border border-white/15 text-white focus:outline-none focus:border-cyan-400"
                required
              />
            </div>

            <div className="pt-3 flex items-center justify-end gap-3 border-t border-white/10">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-2xl bg-white/10 text-slate-300 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-glow-cyan flex items-center gap-1"
              >
                <Lock className="w-4 h-4" /> Update Password
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
