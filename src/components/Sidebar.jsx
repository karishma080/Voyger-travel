import React from 'react';
import { 
  LayoutDashboard, Map, Calendar, Bookmark, Hotel, Plane, 
  Wallet, Bell, History, User, Settings, LogOut, ChevronLeft, ChevronRight, Compass, Sparkles
} from 'lucide-react';

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  collapsed, 
  setCollapsed, 
  unreadCount,
  onLogoutClick 
}) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'trips', label: 'My Trips', icon: Map },
    { id: 'bookings', label: 'Upcoming Bookings', icon: Calendar },
    { id: 'saved', label: 'Saved Destinations', icon: Bookmark },
    { id: 'hotels', label: 'Hotels', icon: Hotel },
    { id: 'flights', label: 'Flights', icon: Plane },
    { id: 'budget', label: 'Travel Budget', icon: Wallet },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadCount },
    { id: 'history', label: 'Travel History', icon: History },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside
      className={`fixed top-20 bottom-0 left-0 z-40 transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      } bg-voyger-dark/70 dark:bg-[#0A1628]/80 light:bg-white/80 backdrop-blur-2xl border-r border-voyger-glassBorder dark:border-white/10 light:border-cyan-900/10 flex flex-col justify-between py-6 px-3 shadow-xl`}
    >
      {/* Sidebar Header & Collapse Toggle */}
      <div>
        <div className="flex items-center justify-between px-3 mb-6">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400">
                Travel Assistant
              </span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-xl bg-white/5 dark:bg-white/5 light:bg-slate-100 border border-white/10 dark:border-white/10 light:border-slate-300 text-slate-300 light:text-slate-600 hover:text-cyan-400 hover:bg-white/10 transition-all ml-auto"
            title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Main Nav Items */}
        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-2xl text-xs font-semibold transition-all relative group ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/10 text-cyan-400 border border-cyan-500/30 shadow-glow-cyan'
                    : 'text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-white dark:hover:text-white light:hover:text-cyan-600 hover:bg-white/5 light:hover:bg-cyan-500/10'
                }`}
                title={collapsed ? item.label : undefined}
              >
                {/* Active Indicator Bar */}
                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-cyan-400 shadow-glow-cyan" />
                )}

                <IconComponent className={`w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110 ${
                  isActive ? 'text-cyan-400' : 'text-slate-400 light:text-slate-500 group-hover:text-cyan-400'
                }`} />

                {!collapsed && (
                  <span className="truncate tracking-wide">{item.label}</span>
                )}

                {/* Badge if present */}
                {item.badge && item.badge > 0 ? (
                  <span className={`ml-auto px-2 py-0.5 rounded-full text-[10px] font-black ${
                    collapsed ? 'absolute top-1 right-1' : ''
                  } bg-cyan-500 text-slate-950 shadow-glow-cyan animate-pulse`}>
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout Action at Bottom */}
      <div className="pt-4 border-t border-white/10 light:border-slate-200">
        <button
          onClick={onLogoutClick}
          className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-2xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all ${
            collapsed ? 'justify-center' : ''
          }`}
          title="Logout"
        >
          <LogOut className="w-5 h-5 flex-shrink-0 text-rose-400" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
