import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Home() {
  let products = [];
  try {
    const res = await fetch('http://localhost:5000/api/products', { cache: 'no-store' });
    if (res.ok) {
      products = await res.json();
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }

  return (
    <div className="font-sans">
      {/* Top Purple Banner */}
      <div className="bg-[#5822B4] text-white p-6 pt-12 pb-16 relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-[10px] font-semibold mb-4 backdrop-blur-sm uppercase tracking-wider border border-white/20">
            <span className="text-yellow-300 text-sm">✨</span> NO-COST EMIs
          </div>
          <h1 className="text-[36px] font-extrabold mb-3 leading-tight tracking-tight">
            Shop today,<br />Pay <span className="italic font-serif font-medium">later</span> using<br />Mutual funds.
          </h1>
          <p className="text-sm text-purple-100 opacity-90 max-w-[85%] font-medium">
            No credit score required. No interest.<br/>Backed by your investments.
          </p>
        </div>
      </div>

      <div className="px-4 -mt-8 relative z-20">
        {/* Tab Pill Container */}
        <div className="flex bg-white rounded-full p-1.5 shadow-md mb-6 border border-slate-100 overflow-x-auto hide-scrollbar">
          <button className="flex-1 py-2 px-3 text-sm font-medium text-slate-500 rounded-full whitespace-nowrap">
            Top Brands
          </button>
          <button className="flex-1 py-2 px-3 text-sm font-medium text-slate-500 rounded-full whitespace-nowrap">
            Nearby Stores
          </button>
          <button className="flex-1 py-2 px-3 text-sm font-bold text-[#5822B4] bg-white shadow-sm rounded-full relative whitespace-nowrap">
            1Fi Marketplace
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#5822B4] rounded-full"></div>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="w-full pl-12 pr-4 py-4 bg-slate-100/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#5822B4] focus:border-transparent text-slate-800 placeholder-slate-400 shadow-sm"
            placeholder="Search online stores..."
          />
        </div>

        {/* Dynamic Product Cards */}
        <div>
          <h2 className="text-[22px] font-bold text-slate-900 mb-5">1Fi Marketplace</h2>
          <div className="space-y-4">
            {products.length === 0 ? (
              <p className="text-slate-500 text-center py-8">No products found. Is the backend running?</p>
            ) : (
              products.map((product: any) => (
                <Link href={`/products/${product.slug}`} key={product.id}>
                  <div className="bg-white rounded-[20px] p-4 shadow-sm border border-slate-200 flex gap-4 active:scale-[0.98] transition-transform mb-4">
                    <div className="w-28 h-32 shrink-0 flex items-center justify-center -ml-2 -mt-2">
                      <img
                        src={product.variants[0]?.imageUrl}
                        alt={product.name}
                        className="object-contain w-full h-full mix-blend-multiply scale-110 drop-shadow-md"
                      />
                    </div>
                    <div className="flex flex-col justify-center flex-1">
                      <h3 className="font-bold text-slate-900 text-lg leading-tight mb-1">{product.name}</h3>
                      <p className="text-sm text-slate-500 mb-2">{product.variants[0]?.storage}</p>
                      
                      {product.emiPlans && product.emiPlans.length > 0 && (
                        <p className="text-[11px] font-medium text-slate-500">
                          No-cost EMIs upto {Math.max(...product.emiPlans.map((p: any) => p.tenureMonths))} months
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
