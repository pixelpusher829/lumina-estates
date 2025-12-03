
import React from 'react';

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen pt-28 pb-20 bg-white">
      <div className="container mx-auto px-6 max-w-3xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Privacy Policy</h1>
        <div className="prose prose-slate lg:prose-lg">
          <p className="text-slate-500 lead mb-8">
            Last updated: October 26, 2023
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Information We Collect</h2>
            <p className="text-slate-600 mb-4">
              We collect information you provide directly to us when you create an account, update your profile, use the interactive features of our Service, subscribe to our newsletter, request customer support, or otherwise communicate with us.
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Name, email address, phone number, and postal address.</li>
              <li>Property preferences and search history.</li>
              <li>Communications with our agents and support team.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. How We Use Your Information</h2>
            <p className="text-slate-600 mb-4">
              We use the information we collect to provide, maintain, and improve our services, including to:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Process transactions and send related information.</li>
              <li>Send you technical notices, updates, security alerts, and support messages.</li>
              <li>Respond to your comments, questions, and requests.</li>
              <li>Communicate with you about products, services, offers, promotions, and events.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Data Security</h2>
            <p className="text-slate-600 mb-4">
              We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction. However, no internet transmission is completely secure.
            </p>
          </section>
          
           <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Contact Us</h2>
            <p className="text-slate-600 mb-4">
              If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:privacy@luminaestates.com" className="text-primary-600 hover:underline">privacy@luminaestates.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
