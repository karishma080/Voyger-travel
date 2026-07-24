import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import OverviewCards from './components/OverviewCards';
import UpcomingTripCard from './components/UpcomingTripCard';
import RecentBookingsTable from './components/RecentBookingsTable';
import SavedDestinationsGrid from './components/SavedDestinationsGrid';
import BudgetTracker from './components/BudgetTracker';
import ActivityTimeline from './components/ActivityTimeline';
import RecommendedCarousel from './components/RecommendedCarousel';
import NotificationsPanel from './components/NotificationsPanel';
import TravelHistoryView from './components/TravelHistoryView';
import ProfileSummaryView from './components/ProfileSummaryView';
import SettingsView from './components/SettingsView';
import SkeletonLoader from './components/SkeletonLoader';
import TripDetailsModal from './components/TripDetailsModal';
import EditProfileModal from './components/EditProfileModal';
import AddExpenseModal from './components/AddExpenseModal';
import ChangePasswordModal from './components/ChangePasswordModal';
import LogoutModal from './components/LogoutModal';
import Footer from './components/Footer';

import { 
  initialUserData, overviewStats, upcomingTripData, initialBookings, 
  savedDestinationsData, budgetTrackerData, activityTimelineData, 
  recommendedDestinations, initialNotifications, travelHistoryData 
} from './data/mockData';

import { Sparkles, RefreshCw, CheckCircle2, Info } from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);

  // App Data States
  const [userData, setUserData] = useState(initialUserData);
  const [stats] = useState(overviewStats);
  const [upcomingTrip] = useState(upcomingTripData);
  const [bookings, setBookings] = useState(initialBookings);
  const [savedDestinations, setSavedDestinations] = useState(savedDestinationsData);
  const [budget, setBudget] = useState(budgetTrackerData);
  const [activities] = useState(activityTimelineData);
  const [recommended] = useState(recommendedDestinations);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [travelHistory] = useState(travelHistoryData);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [selectedTripModal, setSelectedTripModal] = useState(null);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Toast Notification state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Simulate skeleton loading when switching tabs
  const handleTabChange = (tabId) => {
    if (tabId === 'logout') {
      setShowLogoutModal(true);
      return;
    }
    setLoading(true);
    setActiveTab(tabId);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  // Sync dark mode class on <html> element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [darkMode]);

  // Wishlist toggle handler
  const handleToggleWishlist = (id) => {
    setSavedDestinations(prev => prev.map(item => {
      if (item.id === id) {
        const nextState = !item.isWishlisted;
        showToast(nextState ? `Added ${item.name} to Wishlist!` : `Removed ${item.name} from Wishlist.`, 'info');
        return { ...item, isWishlisted: nextState };
      }
      return item;
    }));
  };

  // Notifications handlers
  const handleMarkAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read');
  };

  const handleToggleNotificationRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: !n.read } : n));
  };

  const handleDeleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    showToast('Notification deleted', 'info');
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // Add Expense handler
  const handleAddExpense = (newExp) => {
    setBudget(prev => {
      const newSpent = prev.spentAmount + newExp.amount;
      const newRemaining = prev.totalBudget - newSpent;
      const newPct = Math.min(100, Math.round((newSpent / prev.totalBudget) * 100));
      return {
        ...prev,
        spentAmount: newSpent,
        remainingBudget: newRemaining,
        spentPercentage: newPct
      };
    });
    setShowAddExpenseModal(false);
    showToast(`Recorded expense: $${newExp.amount} for ${newExp.title}`);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 font-primary text-slate-100 ${
      darkMode ? 'bg-voyger-dark dark' : 'bg-slate-50 light text-slate-900'
    }`}>
      
      {/* Toast Overlay Banner */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-[#0F172A] border border-cyan-400/40 shadow-glow-cyan text-white text-xs font-semibold flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom duration-300">
          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Fixed Top Navbar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        unreadCount={unreadCount}
        notifications={notifications}
        markAllNotificationsRead={handleMarkAllNotificationsRead}
        setActiveTab={handleTabChange}
        userData={userData}
        onLogoutClick={() => setShowLogoutModal(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Collapsible Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        unreadCount={unreadCount}
        onLogoutClick={() => setShowLogoutModal(true)}
      />

      {/* Main Content Viewport */}
      <main className={`pt-24 pb-12 transition-all duration-300 ${
        sidebarCollapsed ? 'pl-24' : 'pl-24 lg:pl-72'
      } pr-4 sm:pr-6 lg:pr-8 max-w-[1800px]`}>

        {loading ? (
          <SkeletonLoader />
        ) : (
          <div className="space-y-8">
            
            {/* Welcome Greeting Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-cyan-400" /> Welcome Back, {userData.name}
                </span>
                <h1 className="text-3xl sm:text-4xl font-black text-white light:text-slate-900 font-display mt-1 tracking-tight">
                  Travel Control Dashboard
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={() => {
                    setLoading(true);
                    setTimeout(() => setLoading(false), 300);
                    showToast('Dashboard data refreshed');
                  }}
                  className="px-4 py-2.5 rounded-2xl bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-slate-300 text-xs font-semibold text-slate-300 light:text-slate-700 hover:text-cyan-400 hover:border-cyan-400 transition-all flex items-center gap-2 shadow-sm"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Sync Data
                </button>
              </div>
            </div>

            {/* TAB CONTENT SWITCHING */}

            {/* TAB 1: DASHBOARD OVERVIEW */}
            {activeTab === 'dashboard' && (
              <>
                {/* Statistics Cards Grid */}
                <OverviewCards stats={stats} />

                {/* Upcoming Featured Trip Card */}
                <UpcomingTripCard
                  trip={upcomingTrip}
                  onViewDetails={(t) => setSelectedTripModal(t)}
                />

                {/* Grid row: Recent Bookings Table & Timeline */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <RecentBookingsTable
                      bookings={bookings}
                      onViewBooking={(b) => setSelectedTripModal(b)}
                    />
                  </div>
                  <div>
                    <ActivityTimeline activities={activities} />
                  </div>
                </div>

                {/* Saved Destinations Grid */}
                <SavedDestinationsGrid
                  destinations={savedDestinations}
                  onToggleWishlist={handleToggleWishlist}
                  onExplore={(d) => setSelectedTripModal({
                    destination: d.name + ", " + d.country,
                    country: d.country,
                    flag: d.flag,
                    image: d.image,
                    startDate: d.season,
                    hotelName: "Recommended 5★ Resort",
                    flightNumber: "VY Direct Flight",
                    status: "Wishlist Destination",
                    price: d.cost
                  })}
                />

                {/* Budget Tracker & Recommended Carousel */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <BudgetTracker
                      budgetData={budget}
                      onAddExpense={() => setShowAddExpenseModal(true)}
                    />
                  </div>
                  <div>
                    <RecommendedCarousel
                      items={recommended}
                      onExplore={(item) => setSelectedTripModal({
                        destination: item.name,
                        country: item.country,
                        flag: item.flag,
                        image: item.image,
                        status: "Curated Recommendation",
                        price: item.price
                      })}
                    />
                  </div>
                </div>
              </>
            )}

            {/* TAB 2 & TAB 3: MY TRIPS / UPCOMING BOOKINGS */}
            {(activeTab === 'trips' || activeTab === 'bookings') && (
              <div className="space-y-8">
                <UpcomingTripCard
                  trip={upcomingTrip}
                  onViewDetails={(t) => setSelectedTripModal(t)}
                />
                <RecentBookingsTable
                  bookings={bookings}
                  onViewBooking={(b) => setSelectedTripModal(b)}
                />
              </div>
            )}

            {/* TAB 4: SAVED DESTINATIONS */}
            {activeTab === 'saved' && (
              <SavedDestinationsGrid
                destinations={savedDestinations}
                onToggleWishlist={handleToggleWishlist}
                onExplore={(d) => setSelectedTripModal({
                  destination: d.name + ", " + d.country,
                  country: d.country,
                  flag: d.flag,
                  image: d.image,
                  startDate: d.season,
                  status: "Wishlist Destination",
                  price: d.cost
                })}
              />
            )}

            {/* TAB 5 & TAB 6: HOTELS / FLIGHTS */}
            {(activeTab === 'hotels' || activeTab === 'flights') && (
              <div className="space-y-8">
                <RecentBookingsTable
                  bookings={bookings}
                  onViewBooking={(b) => setSelectedTripModal(b)}
                />
                <RecommendedCarousel
                  items={recommended}
                  onExplore={(item) => setSelectedTripModal({
                    destination: item.name,
                    country: item.country,
                    flag: item.flag,
                    image: item.image,
                    status: "Curated Recommendation",
                    price: item.price
                  })}
                />
              </div>
            )}

            {/* TAB 7: TRAVEL BUDGET */}
            {activeTab === 'budget' && (
              <BudgetTracker
                budgetData={budget}
                onAddExpense={() => setShowAddExpenseModal(true)}
              />
            )}

            {/* TAB 8: NOTIFICATIONS */}
            {activeTab === 'notifications' && (
              <NotificationsPanel
                notifications={notifications}
                onMarkAllRead={handleMarkAllNotificationsRead}
                onToggleRead={handleToggleNotificationRead}
                onDeleteNotification={handleDeleteNotification}
              />
            )}

            {/* TAB 9: TRAVEL HISTORY */}
            {activeTab === 'history' && (
              <TravelHistoryView
                historyData={travelHistory}
                onRebook={(trip) => {
                  showToast(`Rebook request initiated for ${trip.destination}`);
                }}
              />
            )}

            {/* TAB 10: PROFILE SUMMARY */}
            {activeTab === 'profile' && (
              <ProfileSummaryView
                userData={userData}
                onEditProfile={() => setShowEditProfileModal(true)}
              />
            )}

            {/* TAB 11: SETTINGS */}
            {activeTab === 'settings' && (
              <SettingsView
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                onSaveToast={(msg) => showToast(msg)}
                onChangePasswordModal={() => setShowChangePasswordModal(true)}
              />
            )}

          </div>
        )}

        {/* Global Footer */}
        <Footer />
      </main>

      {/* MODALS */}
      {selectedTripModal && (
        <TripDetailsModal
          trip={selectedTripModal}
          onClose={() => setSelectedTripModal(null)}
          onToast={showToast}
        />
      )}

      {showEditProfileModal && (
        <EditProfileModal
          userData={userData}
          onClose={() => setShowEditProfileModal(false)}
          onSave={(updated) => {
            setUserData({ ...userData, ...updated });
            setShowEditProfileModal(false);
            showToast('Profile updated successfully!');
          }}
        />
      )}

      {showAddExpenseModal && (
        <AddExpenseModal
          onClose={() => setShowAddExpenseModal(false)}
          onAdd={handleAddExpense}
        />
      )}

      {showChangePasswordModal && (
        <ChangePasswordModal
          onClose={() => setShowChangePasswordModal(false)}
          onSuccess={() => {
            setShowChangePasswordModal(false);
            showToast('Password changed successfully!');
          }}
        />
      )}

      {showLogoutModal && (
        <LogoutModal
          onClose={() => setShowLogoutModal(false)}
          onConfirm={() => {
            setShowLogoutModal(false);
            showToast('Logged out successfully', 'info');
            setTimeout(() => {
              window.location.href = 'index.html';
            }, 800);
          }}
        />
      )}

    </div>
  );
}
