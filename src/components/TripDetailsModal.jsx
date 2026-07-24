import React from 'react';
import { X, Plane, Hotel, Calendar, Users, MapPin, QrCode, ShieldCheck, Download, Share2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TripDetailsModal({ trip, onClose, onToast }) {
  if (!trip) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-3xl rounded-3xl bg-[#0F172A]/95 dark:bg-[#0F172A]/95 light:bg-white/95 border border-white/20 dark:border-white/20 light:border-slate-300 shadow-2xl overflow-hidden my-8 text-slate-200 light:text-slate-800"
        >
          {/* Top Banner */}
          <div className="relative h-48 sm:h-56 overflow-hidden">
            <img
              src={trip.image}
              alt={trip.destination}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/60 to-transparent" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-white/20 transition-all z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute bottom-4 left-6">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                {trip.status || "Confirmed Booking"}
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white font-display mt-1">
                {trip.destination}
              </h2>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
            
            {/* Quick Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-slate-400 block">Travel Dates</span>
                <span className="font-bold text-white text-xs">{trip.startDate || trip.travelDate}</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-slate-400 block">Travelers</span>
                <span className="font-bold text-white text-xs">{trip.travelers || "2 Guests"}</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-slate-400 block">Flight Booking</span>
                <span className="font-bold text-white text-xs">{trip.flightNumber || trip.flight}</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-slate-400 block">Hotel Stay</span>
                <span className="font-bold text-white text-xs">{trip.hotelName || trip.hotel}</span>
              </div>
            </div>

            {/* Boarding Pass Preview Box */}
            <div className="p-5 rounded-3xl bg-gradient-to-br from-cyan-950/60 to-blue-950/60 border border-cyan-500/30 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Plane className="w-5 h-5 text-cyan-400" />
                  <span className="font-extrabold text-sm text-white">Digital Boarding Pass</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                  Seat {trip.seat || "12A (First)"}
                </span>
              </div>

              <div className="flex items-center justify-between text-center pt-2">
                <div>
                  <span className="text-xs text-slate-400">ORIGIN</span>
                  <span className="block text-2xl font-black text-white font-display">JFK</span>
                  <span className="text-[10px] text-cyan-400">New York</span>
                </div>
                <div className="flex-1 px-4 flex flex-col items-center">
                  <span className="text-[10px] text-slate-400 mb-1">Direct Flight</span>
                  <div className="w-full h-0.5 bg-cyan-400/40 relative">
                    <Plane className="w-4 h-4 text-cyan-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90" />
                  </div>
                </div>
                <div>
                  <span className="text-xs text-slate-400">DESTINATION</span>
                  <span className="block text-2xl font-black text-cyan-400 font-display">JTR</span>
                  <span className="text-[10px] text-slate-300">{trip.country || "Greece"}</span>
                </div>
              </div>

              {/* Barcode Mock */}
              <div className="flex items-center justify-between pt-3 border-t border-cyan-500/20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white p-1 rounded-xl flex items-center justify-center">
                    <QrCode className="w-10 h-10 text-slate-950" />
                  </div>
                  <div className="text-[10px] text-slate-300">
                    <span className="block font-bold text-white">E-Ticket Barcode Valid</span>
                    <span>Scan at gate turnstile</span>
                  </div>
                </div>

                <button
                  onClick={() => onToast('Boarding Pass downloaded to your device!')}
                  className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-glow-cyan flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> Download Pass
                </button>
              </div>
            </div>

            {/* Daily Itinerary Timeline */}
            {trip.itinerary && (
              <div className="space-y-3">
                <h4 className="font-bold text-sm text-white">Daily Itinerary Breakdown</h4>
                <div className="space-y-2">
                  {trip.itinerary.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-1 rounded-xl bg-cyan-500/20 text-cyan-400 font-bold text-[10px]">
                          {item.day}
                        </span>
                        <span className="font-medium text-slate-200">{item.title}</span>
                      </div>
                      <span className="text-slate-400 text-[11px]">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Footer Action */}
          <div className="p-4 bg-white/5 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => onToast('Itinerary link copied to clipboard!')}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-slate-200 flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" /> Share Itinerary
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs shadow-glow-cyan"
            >
              Done
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
