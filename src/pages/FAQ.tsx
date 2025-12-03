import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How do I schedule a viewing?",
      answer: "You can schedule a viewing directly from any property page by clicking the 'Request a Tour' button. Alternatively, you can contact the listing agent via phone or email form provided on the listing."
    },
    {
      question: "Are the property prices negotiable?",
      answer: "Yes, most property prices are negotiable. Our agents are skilled negotiators and will work with you to submit a competitive offer that fits your budget and market conditions."
    },
    {
      question: "What is the typical timeline for buying a home?",
      answer: "The timeline can vary, but generally takes 30-45 days from offer acceptance to closing. This includes time for inspections, financing approval, and title work."
    },
    {
      question: "Do you offer property management services?",
      answer: "Yes, we offer full-service property management for investors. This includes tenant screening, rent collection, maintenance coordination, and financial reporting."
    },
    {
      question: "How do I list my property with Lumina Estates?",
      answer: "To list your property, simply visit our 'Contact' page and select 'Selling a Property' as your topic. One of our senior agents will reach out to schedule a valuation and consultation."
    },
    {
      question: "Is there a fee to use your website?",
      answer: "No, browsing properties and using our website tools is completely free for buyers and renters. Commission fees are typically paid by the seller upon a successful transaction."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-slate-50">
      <div className="container mx-auto px-6 max-w-3xl">
        
        <div className="text-center mb-16">
           <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mx-auto mb-6">
             <HelpCircle size={32} />
           </div>
           <h1 className="text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h1>
           <p className="text-slate-500">Everything you need to know about buying, selling, and renting with Lumina.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-2xl border transition-all duration-300 ${
                openIndex === index ? 'border-primary-200 shadow-md ring-1 ring-primary-100' : 'border-slate-100 shadow-sm hover:border-primary-100'
              }`}
            >
              <button
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className={`text-lg font-bold ${openIndex === index ? 'text-primary-700' : 'text-slate-800'}`}>
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="text-primary-600" size={20} />
                ) : (
                  <ChevronDown className="text-slate-400" size={20} />
                )}
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-transparent">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-primary-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-primary-700 rounded-full blur-3xl -mr-20 -mt-20 opacity-50"></div>
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-700 rounded-full blur-3xl -ml-20 -mb-20 opacity-50"></div>
           
           <div className="relative z-10">
             <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
             <p className="text-primary-200 mb-8 max-w-lg mx-auto">
               Can't find the answer you're looking for? Please chat to our friendly team.
             </p>
             <Link to="/contact" className="inline-block px-8 py-3 bg-white text-primary-900 font-bold rounded-xl hover:bg-primary-50 transition-colors shadow-xl">
               Get in Touch
             </Link>
           </div>
        </div>

      </div>
    </div>
  );
};

export default FAQ;