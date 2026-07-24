import React, { useState } from 'react';
import { Search, Filter, Eye, CheckCircle2, Clock, XCircle, ChevronRight, Hotel, Plane } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RecentBookingsTable({ bookings, onViewBooking }) {
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBookings = bookings.filter(item => {
    const matchesStatus = filterStatus === 'All' || item.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch = item.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.hotel.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.flight.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" /> Confirmed
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Clock className="w-3.5 h-3.5" /> Pending
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
            <XCircle className="w-3.5 h-3.5" /> Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="rounded-3xl border border-white/15 dark:border-white/15 light:border-slate-200 glass-panel p-6 space-y-5">
      
      {/* Header & Filter Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-white light:text-slate-900 font-display">
            Recent Travel Bookings
          </h3>
          <p className="text-xs text-slate-400 light:text-slate-500 mt-0.5">
            Manage your confirmed, pending, and previous reservation records
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Status Filter Tabs */}
          <div className="flex items-center p-1 rounded-2xl bg-white/5 dark:bg-white/5 light:bg-slate-100 border border-white/10 dark:border-white/10 light:border-slate-300 text-xs">
            {['All', 'Confirmed', 'Pending', 'Cancelled'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                  filterStatus === status
                    ? 'bg-cyan-500 text-slate-950 shadow-glow-cyan'
                    : 'text-slate-400 hover:text-white light:text-slate-600'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Search Table Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search booking..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs rounded-xl bg-white/5 dark:bg-white/5 light:bg-slate-100 border border-white/10 dark:border-white/10 light:border-slate-300 text-slate-200 light:text-slate-800 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300 light:text-slate-700">
          <thead className="bg-white/5 dark:bg-white/5 light:bg-slate-100 text-slate-400 light:text-slate-600 uppercase text-[10px] font-bold tracking-wider rounded-xl">
            <tr>
              <th className="py-3.5 px-4 rounded-l-2xl">Destination</th>
              <th className="py-3.5 px-4">Hotel</th>
              <th className="py-3.5 px-4">Flight</th>
              <th className="py-3.5 px-4">Booking Date</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Price</th>
              <th className="py-3.5 px-4 text-right rounded-r-2xl">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 light:divide-slate-200">
            {filteredBookings.length > 0 ? (
              filteredBookings.map((b) => (
                <tr 
                  key={b.id}
                  className="hover:bg-cyan-500/5 light:hover:bg-slate-50 transition-colors group"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={b.image}
                        alt={b.destination}
                        className="w-10 h-10 rounded-xl object-cover ring-1 ring-white/10"
                      />
                      <div>
                        <span className="font-bold text-white light:text-slate-900 text-xs block">
                          {b.destination}
                        </span>
                        <span className="text-[10px] text-cyan-400 font-mono">ID: {b.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-medium text-slate-200 light:text-slate-800">
                    <div className="flex items-center gap-1.5">
                      <Hotel className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{b.hotel}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-medium text-slate-200 light:text-slate-800">
                    <div className="flex items-center gap-1.5">
                      <Plane className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{b.flight}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-400 font-mono text-[11px]">
                    {b.bookingDate}
                  </td>
                  <td className="py-4 px-4">
                    {getStatusBadge(b.status)}
                  </td>
                  <td className="py-4 px-4 font-bold text-white light:text-slate-900 text-sm">
                    {b.price}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => onViewBooking(b)}
                      className="px-3 py-1.5 rounded-xl bg-white/5 dark:bg-white/5 light:bg-slate-100 hover:bg-cyan-500 hover:text-slate-950 border border-white/10 light:border-slate-300 font-semibold text-xs transition-all inline-flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" /> View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-8 text-center text-slate-400 text-xs">
                  No bookings found matching your search filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
