"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProductPage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [selectedEmiPlan, setSelectedEmiPlan] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Await params to be safe across Next 14 and Next 15 versions
    Promise.resolve(params).then((resolvedParams) => {
      fetch(`/api/products/${resolvedParams.slug}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          if (data.variants && data.variants.length > 0) {
            setSelectedVariant(data.variants[0]);
          }
          if (data.emiPlans && data.emiPlans.length > 0) {
            setSelectedEmiPlan(data.emiPlans[0]);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    });
  }, [params]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-[#5822B4] font-semibold bg-slate-50">Loading details...</div>;
  }

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center text-slate-500 bg-slate-50">Product not found</div>;
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-48 font-sans">
      {/* Header */}
      <div className="bg-white px-4 py-4 sticky top-0 z-10 shadow-sm flex items-center">
        <button onClick={() => router.back()} className="mr-4 p-2 -ml-2 rounded-full hover:bg-slate-100">
          <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h1 className="font-semibold text-slate-800 line-clamp-1">{product.name}</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Top Section / Product Info */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="inline-block px-2 py-1 bg-red-50 text-red-600 text-[10px] font-bold rounded mb-3 tracking-wide">NEW</div>
          <h2 className="text-3xl font-medium text-slate-800 mb-1 leading-tight">{product.name}</h2>
          <p className="text-slate-500 text-sm mb-6">{selectedVariant?.storage}</p>

          <div className="w-full flex items-center justify-center bg-transparent mb-10">
            <img 
              src={selectedVariant?.imageUrl || 'https://via.placeholder.com/300'} 
              alt={product.name} 
              className="max-h-[280px] w-auto mx-auto object-contain drop-shadow-md"
            />
          </div>

          <div className="flex flex-col items-center">
            <p className="text-[11px] text-slate-400 mb-4 font-medium uppercase tracking-wider">Available in {product.variants?.length || 0} finishes</p>
            <div className="flex gap-4">
              {product.variants?.map((variant: any) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant)}
                  className={`w-7 h-7 rounded-full border-2 focus:outline-none transition-all ${
                    selectedVariant?.id === variant.id 
                      ? 'border-[#5822B4] scale-110 shadow-md ring-2 ring-purple-100 ring-offset-2' 
                      : 'border-slate-200 ring-1 ring-slate-200'
                  }`}
                  style={{ backgroundColor: getVariantColor(variant.color) }}
                  title={variant.color}
                />
              ))}
            </div>
          </div>
        </div>

        {/* EMI Section */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
          <div className="flex flex-col mb-5 pb-5 border-b border-slate-100">
            <div className="flex items-end gap-2 mb-1">
              <span className="text-3xl font-bold text-slate-800 tracking-tight">₹{selectedVariant?.price.toLocaleString('en-IN')}</span>
            </div>
            {selectedVariant?.mrp > selectedVariant?.price && (
              <span className="text-sm font-medium text-slate-400 line-through">₹{selectedVariant?.mrp.toLocaleString('en-IN')}</span>
            )}
            <p className="text-sm font-medium text-slate-600 mt-2">EMI plans backed by mutual funds</p>
          </div>
          
          <div className="space-y-3">
            {product.emiPlans?.map((plan: any) => (
              <div 
                key={plan.id}
                onClick={() => setSelectedEmiPlan(plan)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col ${
                  selectedEmiPlan?.id === plan.id 
                    ? 'border-[#5822B4] bg-[#5822B4]/[0.02] shadow-sm' 
                    : 'border-slate-100 bg-white hover:border-slate-200'
                }`}
              >
                <div className="flex justify-between items-center mb-1.5">
                  <div className="font-semibold text-slate-800 text-sm">
                    ₹{plan.monthlyAmount.toLocaleString('en-IN')} x {plan.tenureMonths} months
                  </div>
                  <div className="font-medium text-[13px] text-slate-600">
                    {plan.interestRate}% interest
                  </div>
                </div>
                {plan.cashbackInfo && (
                  <div className="text-[11px] font-medium text-emerald-600 bg-emerald-50 self-start px-2 py-0.5 rounded">
                    {plan.cashbackInfo}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Button - Sticky Bottom */}
      <div className="fixed bottom-[64px] w-full max-w-md bg-white border-t border-slate-200 p-4 z-20 shadow-[0_-4px_15px_-3px_rgba(0,0,0,0.05)]">
        <button 
          onClick={() => {
            if (selectedEmiPlan) {
              setShowModal(true);
            }
          }}
          className="w-full bg-[#5822B4] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-purple-200 active:scale-[0.98] transition-transform"
        >
          Proceed with Selected Plan
        </button>
      </div>

      {/* Success Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-100">
                <svg className="w-8 h-8 text-[#5822B4]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Plan Selected Successfully!</h3>
              <p className="text-slate-500 text-sm mb-6">Your purchase application is ready.</p>
              
              <div className="bg-slate-50 rounded-xl p-4 text-left space-y-2 mb-6 border border-slate-100">
                <p className="text-sm text-slate-800 font-semibold">{product.name}</p>
                <p className="text-[13px] text-slate-500">{selectedVariant?.color}, {selectedVariant?.storage}</p>
                <p className="text-[13px] text-slate-500 font-medium">Total: ₹{selectedVariant?.price.toLocaleString('en-IN')}</p>
                <div className="h-px bg-slate-200 w-full my-2"></div>
                <p className="text-[13px] font-bold text-[#5822B4]">{selectedEmiPlan?.tenureMonths} Months {selectedEmiPlan?.interestRate === 0 ? 'No-Cost ' : ''}EMI</p>
              </div>
              
              <div className="space-y-3">
                <button 
                  onClick={() => setShowModal(false)}
                  className="w-full bg-[#5822B4] text-white font-bold py-3.5 rounded-xl shadow-md active:scale-[0.98] transition-transform"
                >
                  Done
                </button>
                <button 
                  onClick={() => router.push('/')}
                  className="w-full bg-white text-slate-600 font-semibold py-3.5 rounded-xl border border-slate-200 active:scale-[0.98] transition-transform hover:bg-slate-50"
                >
                  Back to Marketplace
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper function to map color string to hex for dots
function getVariantColor(colorStr: string) {
  const colorMap: Record<string, string> = {
    'natural titanium': '#B8B3A8',
    'blue titanium': '#203a4e',
    'titanium gray': '#4f5360',
    'titanium black': '#2D2D2D',
    'obsidian': '#423f3f',
    'porcelain': '#E8E6E1',
  };
  return colorMap[colorStr.toLowerCase()] || '#cccccc';
}
