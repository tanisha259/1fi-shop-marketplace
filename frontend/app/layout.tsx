import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '1Fi Marketplace',
  description: 'Shop today, Pay later using Mutual funds.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-900 text-slate-800">
        {/* Mobile View Container */}
        <div className="max-w-md mx-auto bg-slate-50 min-h-screen relative shadow-2xl pb-24 shadow-black sm:border-x sm:border-slate-200 overflow-x-hidden">
          {children}
          
          {/* Bottom Nav Bar - Fixed */}
          <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-slate-200 flex justify-around items-center p-2 pb-safe z-50">
            <button className="flex flex-col items-center text-slate-400 hover:text-purple-700 transition-colors p-2">
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
              <span className="text-[10px] font-medium">Home</span>
            </button>
            <button className="flex flex-col items-center text-purple-700 font-semibold relative p-2">
              <svg className="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 24 24"><path d="M4 6h16v2H4zm2 4h12v10H6zm3 2v6h6v-6z"></path></svg>
              <span className="text-[10px]">Shop</span>
              <div className="absolute -top-[10px] left-1/2 -translate-x-1/2 w-8 h-1 bg-purple-700 rounded-b-full"></div>
            </button>
            <button className="flex flex-col items-center text-slate-400 hover:text-purple-700 transition-colors p-2">
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
              <span className="text-[10px] font-medium">EMI Dues</span>
            </button>
            <button className="flex flex-col items-center text-slate-400 hover:text-purple-700 transition-colors p-2">
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
              <span className="text-[10px] font-medium">Limit</span>
            </button>
            <button className="flex flex-col items-center text-slate-400 hover:text-purple-700 transition-colors p-2">
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              <span className="text-[10px] font-medium">Profile</span>
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
