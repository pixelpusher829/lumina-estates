import React from 'react';
import { Search, Home, FileText, UserCheck, ShieldQuestion, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Help: React.FC = () => {
  const categories = [
    {
      icon: Home,
      title: 'Buying a Home',
      desc: 'Guides for first-time buyers, financing, and closing.',
      link: '#'
    },
    {
      icon: FileText,
      title: 'Selling Your Property',
      desc: 'Tips on valuation, staging, and listing your home.',
      link: '#'
    },
    {
      icon: UserCheck,
      title: 'Renting',
      desc: 'Tenant screening, lease agreements, and deposits.',
      link: '#'
    },
    {
      icon: ShieldQuestion,
      title: 'Account & Security',
      desc: 'Managing your profile, privacy settings, and data.',
      link: '#'
    }
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 bg-slate-50">
      
      {/* Search Header */}
      <div className="bg-slate-900 text-white py-16 md:py-24 mb-12">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">How can we help you?</h1>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search for answers..." 
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all shadow-xl"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6">
        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-20 mb-16 relative z-10">
          {categories.map((cat, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:-translate-y-1 transition-transform duration-300">
               <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 mb-6">
                 <cat.icon size={24} />
               </div>
               <h3 className="text-xl font-bold text-slate-900 mb-2">{cat.title}</h3>
               <p className="text-slate-500 text-sm mb-6 leading-relaxed">{cat.desc}</p>
               <Link to="/faq" className="text-primary-600 font-bold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                 Read Articles <ArrowRight size={16} />
               </Link>
            </div>
          ))}
        </div>

        {/* Popular Articles */}
        <div className="max-w-4xl mx-auto">
           <h2 className="text-2xl font-bold text-slate-900 mb-8">Popular Articles</h2>
           <div className="bg-white rounded-3xl shadow-sm border border-slate-100 divide-y divide-slate-100">
              {[
                "How do I schedule a property tour?",
                "What documents do I need for a mortgage pre-approval?",
                "Can I list my property if it needs renovations?",
                "Understanding closing costs and fees."
              ].map((article, idx) => (
                <div key={idx} className="p-6 hover:bg-slate-50 transition-colors flex items-center justify-between group cursor-pointer">
                   <span className="text-slate-700 font-medium group-hover:text-primary-700 transition-colors">{article}</span>
                   <ArrowRight size={18} className="text-slate-300 group-hover:text-primary-500 transition-colors" />
                </div>
              ))}
           </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
           <p className="text-slate-500 mb-4">Can't find what you're looking for?</p>
           <Link to="/contact" className="inline-block px-8 py-3 bg-white border border-slate-200 text-slate-900 font-bold rounded-xl hover:bg-slate-50 transition-colors">
             Contact Support
           </Link>
        </div>

      </div>
    </div>
  );
};

export default Help;