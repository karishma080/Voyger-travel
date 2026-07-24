import React from 'react';
import { Plane, Mail, Phone, MapPin, Globe, Twitter, Instagram, Facebook, Linkedin, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 dark:border-white/10 light:border-slate-300 bg-[#0A1628]/80 dark:bg-[#0A1628]/80 light:bg-slate-900 text-slate-300 text-xs backdrop-blur-2xl">
      <div className="max-w-[1700px] mx-auto px-6 py-12 space-y-10">
        
        {/* Main Footer Links & Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-glow-cyan">
                <Plane className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white font-display tracking-tight">
                Voyger<span className="text-cyan-400">.</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Your modern luxury travel assistant. Discover extraordinary destinations, manage bookings, and curate unforgettable journeys worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="index.html" className="hover:text-cyan-400 transition-colors">Home</a></li>
              <li><a href="destination.html" className="hover:text-cyan-400 transition-colors">Explore Destinations</a></li>
              <li><a href="trip-planner.html" className="hover:text-cyan-400 transition-colors">AI Trip Planner</a></li>
              <li><a href="hotels.html" className="hover:text-cyan-400 transition-colors">Luxury Hotels</a></li>
              <li><a href="flights.html" className="hover:text-cyan-400 transition-colors">First & Business Flights</a></li>
            </ul>
          </div>

          {/* Concierge & Support */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">24/7 Travel Support</h4>
            <div className="space-y-2 text-slate-400">
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>concierge@voyger.com</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>+1 (800) 555-VOYGER</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>Global Headquarters • San Francisco & Paris</span>
              </p>
            </div>
          </div>

          {/* Social Media & Newsletter */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Connect With Us</h4>
            <div className="flex items-center gap-3">
              <a href="#" className="p-2.5 rounded-xl bg-white/5 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-white/5 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-white/5 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-white/5 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>© 2026 Voyger Travel Inc. All rights reserved. Designed with precision & luxury.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-300">Cookie Preferences</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
