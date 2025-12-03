import React from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen pt-28 pb-20 bg-slate-50">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Get in Touch</h1>
          <p className="text-slate-500">
            Have questions about a property or need help with your search? 
            Our team of experts is ready to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
               <h3 className="text-xl font-bold text-slate-900 mb-6">Contact Information</h3>
               
               <div className="space-y-6">
                 <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary-50 text-primary-600 rounded-xl">
                       <Phone size={20} />
                    </div>
                    <div>
                       <p className="text-sm text-slate-400 font-medium mb-1">Phone</p>
                       <p className="text-slate-700 font-semibold text-lg">+1 (800) 123-4567</p>
                       <p className="text-slate-500 text-sm">Mon-Fri 9am-6pm</p>
                    </div>
                 </div>

                 <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary-50 text-primary-600 rounded-xl">
                       <Mail size={20} />
                    </div>
                    <div>
                       <p className="text-sm text-slate-400 font-medium mb-1">Email</p>
                       <p className="text-slate-700 font-semibold text-lg">hello@luminaestates.com</p>
                       <p className="text-slate-500 text-sm">Online support 24/7</p>
                    </div>
                 </div>

                 <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary-50 text-primary-600 rounded-xl">
                       <MapPin size={20} />
                    </div>
                    <div>
                       <p className="text-sm text-slate-400 font-medium mb-1">Office</p>
                       <p className="text-slate-700 font-semibold text-lg">123 Innovation Dr.</p>
                       <p className="text-slate-500 text-sm">Metropolis, NY 10012</p>
                    </div>
                 </div>
               </div>
            </div>

            {/* FAQ Mini Card */}
            <div className="bg-primary-900 p-8 rounded-3xl shadow-lg text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary-700 rounded-full blur-2xl -mr-10 -mt-10"></div>
               <div className="relative z-10">
                 <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                   <MessageSquare size={20} />
                   Live Chat
                 </h3>
                 <p className="text-primary-100 mb-6 text-sm">
                   Need immediate assistance? Start a live chat with one of our available agents.
                 </p>
                 <button className="w-full py-3 bg-white text-primary-900 font-bold rounded-xl hover:bg-primary-50 transition-colors">
                   Start Chat
                 </button>
               </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-slate-100">
               <h3 className="text-2xl font-bold text-slate-900 mb-8">Send us a Message</h3>
               
               <form className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-sm font-semibold text-slate-700">First Name</label>
                       <input 
                         type="text" 
                         className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                         placeholder="John"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-semibold text-slate-700">Last Name</label>
                       <input 
                         type="text" 
                         className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                         placeholder="Doe"
                       />
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-sm font-semibold text-slate-700">Email Address</label>
                       <input 
                         type="email" 
                         className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                         placeholder="john@example.com"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                       <input 
                         type="tel" 
                         className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                         placeholder="+1 (555) 000-0000"
                       />
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Topic</label>
                    <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-600">
                      <option>Buying a Property</option>
                      <option>Selling a Property</option>
                      <option>Renting</option>
                      <option>Other</option>
                    </select>
                 </div>

                 <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Message</label>
                    <textarea 
                      rows={5}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all resize-none"
                      placeholder="How can we help you?"
                    ></textarea>
                 </div>

                 <button 
                   type="button"
                   className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-lg shadow-primary-600/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                 >
                   <Send size={20} />
                   Send Message
                 </button>
               </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;