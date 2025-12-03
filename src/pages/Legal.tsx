
import React from 'react';

const Legal: React.FC = () => {
  return (
    <div className="min-h-screen pt-28 pb-20 bg-white">
      <div className="container mx-auto px-6 max-w-3xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Legal & Privacy</h1>
        <div className="prose prose-slate lg:prose-lg">
          <p className="text-slate-500 lead mb-12">
            Last updated: October 26, 2023
          </p>

          {/* Terms Section */}
          <section className="mb-16 border-b border-slate-100 pb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Terms of Service</h2>
            
            <h3 className="text-xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h3>
            <p className="text-slate-600 mb-6">
              By accessing or using the Lumina Estates website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mb-4">2. Use of Services</h3>
            <p className="text-slate-600 mb-6">
              You agree to use our services only for lawful purposes and in accordance with these Terms. You are prohibited from violating or attempting to violate the security of the Site, including, without limitation:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
              <li>Accessing data not intended for you.</li>
              <li>Attempting to probe, scan, or test the vulnerability of a system.</li>
              <li>Interfering with service to any user, host, or network.</li>
            </ul>

            <h3 className="text-xl font-bold text-slate-900 mb-4">3. Property Listings</h3>
            <p className="text-slate-600 mb-6">
              Lumina Estates strives to provide accurate and up-to-date property information. However, we do not warrant that property descriptions, prices, or other content on the site is accurate, complete, reliable, current, or error-free.
            </p>
          </section>

          {/* Privacy Section */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Privacy Policy</h2>
            
            <h3 className="text-xl font-bold text-slate-900 mb-4">1. Information We Collect</h3>
            <p className="text-slate-600 mb-6">
              We collect information you provide directly to us when you create an account, update your profile, use the interactive features of our Service, subscribe to our newsletter, request customer support, or otherwise communicate with us.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mb-4">2. How We Use Your Information</h3>
            <p className="text-slate-600 mb-6">
              We use the information we collect to provide, maintain, and improve our services, including to:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
              <li>Process transactions and send related information.</li>
              <li>Send you technical notices, updates, security alerts, and support messages.</li>
              <li>Respond to your comments, questions, and requests.</li>
            </ul>

            <h3 className="text-xl font-bold text-slate-900 mb-4">3. Contact Us</h3>
            <p className="text-slate-600 mb-4">
              If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:privacy@luminaestates.com" className="text-primary-600 hover:underline">privacy@luminaestates.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Legal;
