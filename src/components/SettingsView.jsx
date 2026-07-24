import React, { useState } from 'react';
import { 
  KeyRound, Bell, Globe, DollarSign, Moon, Sun, Lock, 
  ShieldCheck, Eye, Save, CheckCircle2 
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function SettingsView({ darkMode, setDarkMode, onSaveToast, onChangePasswordModal }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState({
    email: true,
    sms: false,
    push: true,
    promos: true
  });

  const [language, setLanguage] = useState('English (US)');
  const [currency, setCurrency] = useState('USD ($)');
  const [publicProfile, setPublicProfile] = useState(true);
  const [activityVisible, setActivityVisible] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white light:text-slate-900 font-display">
          Account & Application Settings
        </h3>
        <p className="text-xs text-slate-400 light:text-slate-500 mt-0.5">
          Configure security, preferences, regional settings & appearance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: Change Password & Security */}
        <div className="rounded-3xl border border-white/15 dark:border-white/15 light:border-slate-200 glass-panel p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-400">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white light:text-slate-900 text-sm">Security & Password</h4>
              <p className="text-xs text-slate-400">Update your account password & 2FA protection</p>
            </div>
          </div>

          <div className="pt-2 space-y-3">
            <button
              onClick={onChangePasswordModal}
              className="w-full py-2.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-glow-cyan flex items-center justify-center gap-2 transition-all"
            >
              <Lock className="w-4 h-4" /> Change Password
            </button>
            <div className="flex items-center justify-between text-xs p-3 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-slate-300">Two-Factor Authentication (2FA)</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Enabled
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Notification Preferences */}
        <div className="rounded-3xl border border-white/15 dark:border-white/15 light:border-slate-200 glass-panel p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-blue-500/20 text-blue-400">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white light:text-slate-900 text-sm">Notification Preferences</h4>
              <p className="text-xs text-slate-400">Choose how you receive travel alerts</p>
            </div>
          </div>

          <div className="space-y-2.5 text-xs text-slate-300">
            <label className="flex items-center justify-between p-2.5 rounded-2xl bg-white/5 border border-white/10 cursor-pointer">
              <span>Email Flight & Hotel Alerts</span>
              <input
                type="checkbox"
                checked={notificationsEnabled.email}
                onChange={(e) => {
                  setNotificationsEnabled({ ...notificationsEnabled, email: e.target.checked });
                  onSaveToast('Notification preferences updated!');
                }}
                className="w-4 h-4 accent-cyan-500"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 rounded-2xl bg-white/5 border border-white/10 cursor-pointer">
              <span>SMS Urgent Boarding Notices</span>
              <input
                type="checkbox"
                checked={notificationsEnabled.sms}
                onChange={(e) => {
                  setNotificationsEnabled({ ...notificationsEnabled, sms: e.target.checked });
                  onSaveToast('Notification preferences updated!');
                }}
                className="w-4 h-4 accent-cyan-500"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 rounded-2xl bg-white/5 border border-white/10 cursor-pointer">
              <span>Promotional & Deal Alerts</span>
              <input
                type="checkbox"
                checked={notificationsEnabled.promos}
                onChange={(e) => {
                  setNotificationsEnabled({ ...notificationsEnabled, promos: e.target.checked });
                  onSaveToast('Notification preferences updated!');
                }}
                className="w-4 h-4 accent-cyan-500"
              />
            </label>
          </div>
        </div>

        {/* Card 3: Regional & Currency */}
        <div className="rounded-3xl border border-white/15 dark:border-white/15 light:border-slate-200 glass-panel p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white light:text-slate-900 text-sm">Language & Currency</h4>
              <p className="text-xs text-slate-400">Set your preferred locale and display currency</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-slate-400 block mb-1 font-medium">Display Language</label>
              <select
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value);
                  onSaveToast(`Language changed to ${e.target.value}`);
                }}
                className="w-full p-2.5 rounded-2xl bg-white/10 dark:bg-white/10 light:bg-slate-100 border border-white/15 text-slate-200 light:text-slate-800 focus:outline-none focus:border-cyan-400"
              >
                <option value="English (US)">English (US)</option>
                <option value="French (Français)">French (Français)</option>
                <option value="Spanish (Español)">Spanish (Español)</option>
                <option value="German (Deutsch)">German (Deutsch)</option>
                <option value="Japanese (日本語)">Japanese (日本語)</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 block mb-1 font-medium">Preferred Currency</label>
              <select
                value={currency}
                onChange={(e) => {
                  setCurrency(e.target.value);
                  onSaveToast(`Currency set to ${e.target.value}`);
                }}
                className="w-full p-2.5 rounded-2xl bg-white/10 dark:bg-white/10 light:bg-slate-100 border border-white/15 text-slate-200 light:text-slate-800 focus:outline-none focus:border-cyan-400"
              >
                <option value="USD ($)">USD ($) - US Dollar</option>
                <option value="EUR (€)">EUR (€) - Euro</option>
                <option value="GBP (£)">GBP (£) - British Pound</option>
                <option value="JPY (¥)">JPY (¥) - Japanese Yen</option>
                <option value="AUD ($)">AUD ($) - Australian Dollar</option>
              </select>
            </div>
          </div>
        </div>

        {/* Card 4: Appearance & Dark Mode */}
        <div className="rounded-3xl border border-white/15 dark:border-white/15 light:border-slate-200 glass-panel p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400">
              {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </div>
            <div>
              <h4 className="font-bold text-white light:text-slate-900 text-sm">Appearance Mode</h4>
              <p className="text-xs text-slate-400">Toggle dark glassmorphism theme vs light mode</p>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10 text-xs">
            <span className="text-slate-300 font-semibold">
              Current Theme: {darkMode ? "Dark Glass Mode" : "Light Mode"}
            </span>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs shadow-glow-cyan"
            >
              Toggle Theme
            </button>
          </div>
        </div>

        {/* Card 5: Privacy & Visibility */}
        <div className="md:col-span-2 rounded-3xl border border-white/15 dark:border-white/15 light:border-slate-200 glass-panel p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-400">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white light:text-slate-900 text-sm">Privacy & Data Control</h4>
              <p className="text-xs text-slate-400">Manage public profile visibility and data sharing</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <label className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10 cursor-pointer">
              <span>Public Traveler Profile</span>
              <input
                type="checkbox"
                checked={publicProfile}
                onChange={(e) => {
                  setPublicProfile(e.target.checked);
                  onSaveToast('Privacy setting updated');
                }}
                className="w-4 h-4 accent-cyan-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10 cursor-pointer">
              <span>Show Activity in Community Feed</span>
              <input
                type="checkbox"
                checked={activityVisible}
                onChange={(e) => {
                  setActivityVisible(e.target.checked);
                  onSaveToast('Privacy setting updated');
                }}
                className="w-4 h-4 accent-cyan-500"
              />
            </label>
          </div>
        </div>

      </div>
    </div>
  );
}
