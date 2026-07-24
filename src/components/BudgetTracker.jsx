import React, { useState } from 'react';
import { DollarSign, Wallet, TrendingUp, ArrowDownRight, Plus, PieChart, Info } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BudgetTracker({ budgetData, onAddExpense }) {
  const [activeMonthHover, setActiveMonthHover] = useState(null);

  const circumference = 2 * Math.PI * 42; // Radius 42
  const strokeDashoffset = circumference - (budgetData.spentPercentage / 100) * circumference;

  const maxMonthly = Math.max(...budgetData.monthlySpending.map(m => m.total));

  return (
    <div className="rounded-3xl border border-white/15 dark:border-white/15 light:border-slate-200 glass-panel p-6 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-white light:text-slate-900 font-display">
              Travel Budget Tracker
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              Annual 2026
            </span>
          </div>
          <p className="text-xs text-slate-400 light:text-slate-500 mt-0.5">
            Monitor expenses across flights, luxury hotels, dining & activities
          </p>
        </div>

        <button
          onClick={onAddExpense}
          className="px-4 py-2.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-glow-cyan flex items-center gap-2 self-start sm:self-auto transition-all"
        >
          <Plus className="w-4 h-4" /> Add New Expense
        </button>
      </div>

      {/* Main Stats Grid with Gauge */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Metric Cards Stack */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white/5 dark:bg-white/5 light:bg-slate-100 border border-white/10 dark:border-white/10 light:border-slate-300 space-y-2">
            <span className="text-xs font-semibold text-slate-400">Total Budget</span>
            <div className="text-2xl font-black text-white light:text-slate-900 font-display">
              ${budgetData.totalBudget.toLocaleString()}
            </div>
            <div className="text-[10px] text-cyan-400 font-semibold flex items-center gap-1">
              <Info className="w-3 h-3" /> Set for 2026 Trips
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 space-y-2">
            <span className="text-xs font-semibold text-cyan-300">Spent Amount</span>
            <div className="text-2xl font-black text-cyan-400 font-display">
              ${budgetData.spentAmount.toLocaleString()}
            </div>
            <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> 62% of allocated
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
            <span className="text-xs font-semibold text-emerald-300">Remaining Budget</span>
            <div className="text-2xl font-black text-emerald-400 font-display">
              ${budgetData.remainingBudget.toLocaleString()}
            </div>
            <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
              <ArrowDownRight className="w-3 h-3" /> Safe balance left
            </div>
          </div>
        </div>

        {/* Circular Progress Gauge */}
        <div className="p-4 rounded-2xl bg-white/5 dark:bg-white/5 light:bg-slate-100 border border-white/10 dark:border-white/10 light:border-slate-300 flex items-center justify-center gap-4">
          <div className="relative w-28 h-28 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                className="text-white/10 dark:text-white/10 light:text-slate-300"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                className="text-cyan-400"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
              />
            </svg>
            <div className="absolute text-center">
              <span className="text-xl font-black text-white light:text-slate-900 font-display">
                {budgetData.spentPercentage}%
              </span>
              <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                Used
              </span>
            </div>
          </div>

          <div className="space-y-1 text-xs">
            <span className="font-bold text-white light:text-slate-900 block">Status: Efficient</span>
            <p className="text-slate-400 text-[11px] leading-tight">
              You are staying under your maximum target limit!
            </p>
          </div>
        </div>

      </div>

      {/* Category Breakdown & Monthly Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4 border-t border-white/10 light:border-slate-200">
        
        {/* Category Breakdown list */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Category Expense Breakdown
          </h4>
          <div className="space-y-2.5">
            {budgetData.categories.map((cat, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300 light:text-slate-700 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                    {cat.name}
                  </span>
                  <span className="text-white light:text-slate-900 font-mono">${cat.amount.toLocaleString()}</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500" 
                    style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Bar Chart */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Monthly Expenditure Trend ($ USD)
            </h4>
            <span className="text-[11px] text-cyan-400 font-semibold">Jan - Jul 2026</span>
          </div>

          {/* SVG Bar Chart Visualization */}
          <div className="h-44 p-4 rounded-2xl bg-white/5 dark:bg-white/5 light:bg-slate-100 border border-white/10 dark:border-white/10 light:border-slate-300 flex items-end justify-between gap-2">
            {budgetData.monthlySpending.map((m, idx) => {
              const heightPct = Math.round((m.total / maxMonthly) * 100);
              const isHovered = activeMonthHover === idx;
              return (
                <div 
                  key={idx}
                  onMouseEnter={() => setActiveMonthHover(idx)}
                  onMouseLeave={() => setActiveMonthHover(null)}
                  className="flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-pointer relative"
                >
                  {/* Tooltip on hover */}
                  {isHovered && (
                    <div className="absolute -top-10 px-2.5 py-1 rounded-xl bg-cyan-500 text-slate-950 text-[10px] font-black shadow-lg z-20 whitespace-nowrap animate-in fade-in">
                      ${m.total.toLocaleString()}
                    </div>
                  )}

                  <div className="w-full max-w-[28px] bg-white/10 rounded-t-xl overflow-hidden flex flex-col justify-end h-full">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${heightPct}%` }}
                      transition={{ duration: 0.6, delay: idx * 0.05 }}
                      className={`w-full rounded-t-xl transition-all ${
                        isHovered 
                          ? 'bg-gradient-to-t from-cyan-400 to-sky-300 shadow-glow-cyan' 
                          : 'bg-gradient-to-t from-cyan-500 to-blue-600'
                      }`}
                    />
                  </div>

                  <span className="text-[10px] font-bold text-slate-400 group-hover:text-cyan-400">
                    {m.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
