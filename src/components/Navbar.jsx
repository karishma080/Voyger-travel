import React, { useState } from 'react';
import { 
  Plane, Search, Bell, Sun, Moon, User, LogOut, 
  Settings, Bookmark, Compass, Menu, X, Check, ExternalLink 
} from 'lucide-react';

export default function Navbar({ 
  darkMode, 
  setDarkMode, 
  unreadCount, 
  notifications, 
  markAllNotificationsRead, 
  setActiveTab,
  userData,
  onLogoutClick,
  searchQuery,
  setSearchQuery
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-voyger-dark/80 dark:bg-[#0A1628]/90 light:bg-white/85 backdrop-blur-xl border-b border-voyger-glassBorder dark:border-white/10 light:border-cyan-900/10 shadow-lg">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <a href="index.html" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-glow-cyan transform group-hover:rotate-12 transition-transform duration-300">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white dark:text-white light:text-slate-900 font-display">
                Voyger<span className="text-cyan-400">.</span>
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 ml-6">
              <a href="index.html" className="px-3 py-2 rounded-xl text-sm font-medium text-slate-300 light:text-slate-600 hover:text-cyan-400 hover:bg-white/5 transition-all">
                Home
              </a>
              <a href="destination.html" className="px-3 py-2 rounded-xl text-sm font-medium text-slate-300 light:text-slate-600 hover:text-cyan-400 hover:bg-white/5 transition-all">
                Destinations
              </a>
              <a href="trip-planner.html" className="px-3 py-2 rounded-xl text-sm font-medium text-slate-300 light:text-slate-600 hover:text-cyan-400 hover:bg-white/5 transition-all">
                Plan Trip
              </a>
              <a href="hotels.html" className="px-3 py-2 rounded-xl text-sm font-medium text-slate-300 light:text-slate-600 hover:text-cyan-400 hover:bg-white/5 transition-all">
                Hotels
              </a>
              <a href="flights.html" className="px-3 py-2 rounded-xl text-sm font-medium text-slate-300 light:text-slate-600 hover:text-cyan-400 hover:bg-white/5 transition-all">
                Flights
              </a>
              <button 
                onClick={() => setActiveTab('dashboard')} 
                className="px-3.5 py-2 rounded-xl text-sm font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 shadow-glow-cyan"
              >
                Dashboard
              </button>
            </nav>
          </div>

          {/* Quick Search & Right Controls */}
          <div className="hidden md:flex items-center gap-4">
            
            {/* Search Input Bar */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search trips, flights, hotels..."
                className="w-56 lg:w-64 pl-10 pr-4 py-2 text-xs rounded-xl bg-white/10 dark:bg-white/10 light:bg-slate-100 text-slate-200 light:text-slate-800 placeholder-slate-400 border border-white/15 dark:border-white/15 light:border-slate-300 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
              />
            </div>

            {/* Notification Bell Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2.5 rounded-xl bg-white/5 dark:bg-white/5 light:bg-slate-100 border border-white/10 dark:border-white/10 light:border-slate-300 text-slate-300 light:text-slate-700 hover:text-cyan-400 hover:bg-white/10 transition-all"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-cyan-500 text-slate-950 font-bold text-[10px] flex items-center justify-center animate-pulse shadow-glow-cyan">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Popover Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl bg-[#0F172A]/95 dark:bg-[#0F172A]/95 light:bg-white/95 backdrop-blur-2xl border border-white/20 dark:border-white/20 light:border-slate-200 shadow-2xl p-4 z-50 text-slate-200 light:text-slate-800 animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10 light:border-slate-200">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-cyan-400" />
                      <span className="font-semibold text-sm">Notifications</span>
                      {unreadCount > 0 && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-cyan-500/20 text-cyan-400 font-bold">
                          {unreadCount} New
                        </span>
                      )}
                    </div>
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      <Check className="w-3 h-3" /> Mark all read
                    </button>
                  </div>

                  <div className="mt-3 space-y-2.5 max-h-72 overflow-y-auto pr-1">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-2.5 rounded-xl border text-xs transition-all ${
                          !notif.read
                            ? 'bg-cyan-500/10 border-cyan-500/30'
                            : 'bg-white/5 light:bg-slate-100/60 border-white/5 light:border-slate-200'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-semibold text-white light:text-slate-900">{notif.title}</span>
                          <span className="text-[10px] text-slate-400">{notif.time}</span>
                        </div>
                        <p className="text-slate-300 light:text-slate-600 mt-1 text-[11px] leading-relaxed">
                          {notif.message}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 pt-2 border-t border-white/10 light:border-slate-200 text-center">
                    <button
                      onClick={() => {
                        setActiveTab('notifications');
                        setShowNotifications(false);
                      }}
                      className="text-xs text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1"
                    >
                      View All Notifications &rarr;
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Dark / Light Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl bg-white/5 dark:bg-white/5 light:bg-slate-100 border border-white/10 dark:border-white/10 light:border-slate-300 text-slate-300 light:text-slate-700 hover:text-amber-400 hover:bg-white/10 transition-all"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
            </button>

            {/* User Profile Dropdown Button */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 p-1.5 pr-3 rounded-2xl bg-white/5 dark:bg-white/5 light:bg-slate-100 border border-white/15 dark:border-white/15 light:border-slate-300 hover:border-cyan-400/50 transition-all group"
              >
                <img
                  src={userData.avatar}
                  alt={userData.name}
                  className="w-9 h-9 rounded-xl object-cover ring-2 ring-cyan-400/50"
                />
                <div className="text-left hidden lg:block">
                  <div className="text-xs font-bold text-white light:text-slate-900 group-hover:text-cyan-400 transition-colors">
                    {userData.name}
                  </div>
                  <div className="text-[10px] text-cyan-400 font-medium">
                    {userData.tierLevel} VIP
                  </div>
                </div>
              </button>

              {/* User Menu Popover */}
              {showUserMenu && (
                <div className="absolute right-0 mt-3 w-56 rounded-2xl bg-[#0F172A]/95 dark:bg-[#0F172A]/95 light:bg-white/95 backdrop-blur-2xl border border-white/20 dark:border-white/20 light:border-slate-200 shadow-2xl p-2 z-50 text-slate-200 light:text-slate-800">
                  <div className="p-3 border-b border-white/10 light:border-slate-200">
                    <p className="font-bold text-sm text-white light:text-slate-900">{userData.name}</p>
                    <p className="text-xs text-slate-400 truncate">{userData.email}</p>
                    <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      👑 {userData.membership}
                    </span>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => { setActiveTab('profile'); setShowUserMenu(false); }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs hover:bg-white/10 light:hover:bg-slate-100 text-slate-300 light:text-slate-700"
                    >
                      <User className="w-4 h-4 text-cyan-400" /> My Profile
                    </button>
                    <button
                      onClick={() => { setActiveTab('settings'); setShowUserMenu(false); }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs hover:bg-white/10 light:hover:bg-slate-100 text-slate-300 light:text-slate-700"
                    >
                      <Settings className="w-4 h-4 text-cyan-400" /> Account Settings
                    </button>
                    <button
                      onClick={() => { setActiveTab('saved'); setShowUserMenu(false); }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs hover:bg-white/10 light:hover:bg-slate-100 text-slate-300 light:text-slate-700"
                    >
                      <Bookmark className="w-4 h-4 text-cyan-400" /> Wishlist Destinations
                    </button>
                  </div>

                  <div className="pt-1 border-t border-white/10 light:border-slate-200">
                    <button
                      onClick={() => { onLogoutClick(); setShowUserMenu(false); }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-rose-400 hover:bg-rose-500/10 font-medium"
                    >
                      <LogOut className="w-4 h-4 text-rose-400" /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Mobile Hamburger Toggle Button */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/10 border border-white/15 text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0A1628]/95 backdrop-blur-2xl px-4 pt-4 pb-6 space-y-3 animate-in slide-in-from-top duration-300">
          <div className="relative mb-3">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-white/10 text-slate-200 border border-white/15"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 text-center text-xs">
            <a href="index.html" className="p-2.5 rounded-xl bg-white/5 text-slate-200 font-medium">Home</a>
            <a href="destination.html" className="p-2.5 rounded-xl bg-white/5 text-slate-200 font-medium">Destinations</a>
            <a href="trip-planner.html" className="p-2.5 rounded-xl bg-white/5 text-slate-200 font-medium">Plan Trip</a>
            <a href="hotels.html" className="p-2.5 rounded-xl bg-white/5 text-slate-200 font-medium">Hotels</a>
            <a href="flights.html" className="p-2.5 rounded-xl bg-white/5 text-slate-200 font-medium">Flights</a>
            <button onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }} className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/40">Dashboard</button>
          </div>
        </div>
      )}
    </header>
  );
}
