"use client";

import { Home, Store, FileText, TrendingUp, User } from 'lucide-react';

const navItems = [
  { icon: Home, label: 'Home', active: false },
  { icon: Store, label: 'Shop', active: true },
  { icon: FileText, label: 'EMI Dues', active: false },
  { icon: TrendingUp, label: 'Limit', active: false },
  { icon: User, label: 'Profile', active: false },
];

export default function BottomNav() {
  return (
    <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-slate-100 py-2 px-4 flex justify-between items-center z-50 shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.08)]">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.label}
            className="flex flex-col items-center relative flex-1 pt-1"
          >
            {/* Top indicator bar for active tab */}
            {item.active && (
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-[3px] bg-purple-600 rounded-b-full" />
            )}

            {/* Icon wrapper */}
            <div
              className={`flex items-center justify-center mb-0.5 ${
                item.active
                  ? 'bg-purple-50 text-purple-600 rounded-lg p-1.5'
                  : 'text-slate-400 p-1.5'
              }`}
            >
              <Icon className="w-5 h-5" strokeWidth={item.active ? 2.5 : 2} />
            </div>

            {/* Label */}
            <span
              className={`text-xs leading-tight ${
                item.active
                  ? 'text-purple-600 font-semibold'
                  : 'text-slate-400 font-normal'
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
