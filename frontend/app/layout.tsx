import './globals.css';
import type { Metadata } from 'next';
import BottomNav from './components/BottomNav';

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
          
          {/* Bottom Nav Bar */}
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
