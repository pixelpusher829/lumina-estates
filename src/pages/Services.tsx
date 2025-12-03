
import React from 'react';
import { ArrowRight, Home, TrendingUp, Shield, Key } from 'lucide-react';

const Services: React.FC = () => {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 container mx-auto px-6">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-100 text-slate-500 text-sm font-medium mb-8 animate-fade-in">
             <span className="w-2 h-2 rounded-full bg-primary-500"></span>
             Premium Real Estate Solutions
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 tracking-tight leading-tight">
            Elevating the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-400">Art of Living</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            We curate experiences, not just transactions. Discover a suite of services designed for the modern homeowner and investor.
          </p>
        </div>

        {/* Decorative Background Blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      {/* Service 1: Residential (Text Left, Images Right) */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            {/* Text Content */}
            <div className="lg:w-1/2 relative z-10">
              <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 mb-6">
                <Home size={24} />
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Residential Sales & <br/>Acquisitions</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Finding a home is about finding your place in the world. Our bespoke search process combines AI-driven market analysis with human intuition to uncover off-market gems and negotiate the best possible terms.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                 <div className="flex items-center gap-3">
                    <div className="w-1 h-12 bg-slate-200"></div>
                    <div>
                       <span className="block text-2xl font-bold text-slate-900">14 Days</span>
                       <span className="text-sm text-slate-500 uppercase tracking-wider">Avg. Time to Sell</span>
                    </div>
                 </div>
              </div>
            </div>

            {/* Asymmetrical Image Cluster */}
            <div className="lg:w-1/2 relative">
               <div className="relative z-10 w-4/5 ml-auto">
                 <img 
                   src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800" 
                   alt="Modern Living Room" 
                   className="rounded-[2.5rem] shadow-2xl w-full object-cover aspect-[4/5]"
                 />
               </div>
               {/* Floating Overlay Image */}
               <div className="absolute -bottom-6 -left-4 w-1/2 z-20">
                  <img 
                    src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=600" 
                    alt="Keys" 
                    className="rounded-3xl shadow-xl border-8 border-white w-full object-cover aspect-square"
                  />
               </div>
               {/* Decorative Circle */}
               <div className="absolute -top-12 -right-12 w-64 h-64 bg-rose-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -z-10"></div>
            </div>

          </div>
        </div>
      </section>

      {/* Service 2: Investment (Images Left, Text Right) */}
      <section className="py-32 relative bg-slate-50/50 z-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-24">
            
            {/* Text Content */}
            <div className="lg:w-1/2 relative z-10">
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-6">
                <TrendingUp size={24} />
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Strategic Investment <br/>Consulting</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Real estate is the cornerstone of wealth. We provide institutional-grade analytics to individual investors, identifying high-growth corridors and turnkey rental opportunities before they hit the mass market.
              </p>
              <button className="text-emerald-700 font-bold hover:text-emerald-800 inline-flex items-center gap-2 group">
                View Market Reports <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Asymmetrical Image Cluster */}
            <div className="lg:w-1/2 relative">
               <div className="relative z-10 w-4/5 mr-auto">
                 <img 
                   src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" 
                   alt="Skyscraper" 
                   className="rounded-[2.5rem] shadow-2xl w-full object-cover aspect-[3/4]"
                 />
               </div>
               {/* Floating Glass Card */}
               <div className="absolute top-1/2 -right-4 lg:-right-8 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/50 max-w-xs">
                  <div className="flex items-center gap-3 mb-2">
                     <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                     <span className="text-sm font-semibold text-slate-800">ROI Projection</span>
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-1">+12.4%</div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                     <div className="bg-emerald-500 w-3/4 h-full rounded-full"></div>
                  </div>
               </div>
               {/* Decorative Blob */}
               <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -z-10"></div>
            </div>

          </div>
        </div>
      </section>

      {/* Service 3: Property Management (Text Left, Images Right) */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            {/* Text Content */}
            <div className="lg:w-1/2 relative z-10">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6">
                <Key size={24} />
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Effortless Property <br/>Management</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Your time is your most valuable asset. We handle the 3 a.m. calls, the maintenance coordination, and the tenant screening. You simply receive the monthly deposit and a detailed performance report.
              </p>
              <div className="flex gap-3">
                 <span className="px-4 py-2 bg-slate-50 rounded-full text-slate-600 text-sm font-medium">Tenant Screening</span>
                 <span className="px-4 py-2 bg-slate-50 rounded-full text-slate-600 text-sm font-medium">24/7 Support</span>
              </div>
            </div>

            {/* Asymmetrical Image Cluster */}
            <div className="lg:w-1/2 relative">
               <div className="relative z-10 w-5/6">
                 <img 
                   src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200" 
                   alt="Luxury Home Exterior" 
                   className="rounded-[3rem] shadow-2xl w-full object-cover h-[500px]"
                 />
               </div>
               {/* Floating Overlay Image */}
               <div className="absolute -bottom-8 right-0 w-2/5 z-20">
                  <img 
                    src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=400" 
                    alt="Happy Tenant" 
                    className="rounded-full shadow-xl border-8 border-white w-full object-cover aspect-square"
                  />
               </div>
                {/* Decorative Elements */}
               <div className="absolute -top-10 -left-10 w-24 h-24 border-4 border-indigo-100 rounded-full -z-10"></div>
               <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-indigo-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -z-10"></div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden z-20">
         <div className="absolute inset-0 bg-slate-900"></div>
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"></div>
         
         <div className="container mx-auto px-6 relative z-10 text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">Ready to elevate your <br/> real estate experience?</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               <button className="w-full sm:w-auto px-10 py-5 bg-white text-slate-900 font-bold rounded-2xl hover:bg-slate-50 transition-colors shadow-lg shadow-white/10">
                 Schedule Consultation
               </button>
               <button className="w-full sm:w-auto px-10 py-5 bg-transparent border border-white/20 text-white font-bold rounded-2xl hover:bg-white/10 transition-colors backdrop-blur-sm">
                 Explore Properties
               </button>
            </div>
         </div>
      </section>

    </div>
  );
};

export default Services;
