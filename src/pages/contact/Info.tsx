import { Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import type React from "react";

const ContactInfo: React.FC = () => {
	return (
		<div className="space-y-8">
			<div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
				<h3 className="text-xl font-bold text-slate-900 mb-6">
					Contact Information
				</h3>

				<div className="space-y-6">
					<div className="flex items-start gap-4">
						<div className="p-4 bg-emerald-50 text-emerald-400 rounded-xl">
							<Phone size={20} />
						</div>
						<div>

							<p className="text-slate-700 font-semibold text-lg">
								+1 (800) 123-4567
							</p>
							<p className="text-slate-500 text-sm">Mon-Fri 9am-6pm</p>
						</div>
					</div>

					<div className="flex items-start gap-4">
						<div className="p-4 bg-emerald-50 text-emerald-400 rounded-xl">
							<Mail size={20} />
						</div>
						<div>
							<p className="text-slate-700 font-semibold text-lg">
								hello@luminaestates.com
							</p>
							<p className="text-slate-500 text-sm">Online support 24/7</p>
						</div>
					</div>

					<div className="flex items-start gap-4">
						<div className="p-4 bg-emerald-50 text-emerald-400 rounded-xl">
							<MapPin size={20} />
						</div>
						<div>
							<p className="text-slate-700 font-semibold text-lg">
								123 Innovation Dr.
							</p>
							<p className="text-slate-500 text-sm">Metropolis, NY 10012</p>
						</div>
					</div>
				</div>
			</div>

			{/* FAQ Mini Card */}
			<div className="bg-emerald-500 p-8 rounded-3xl shadow-lg text-white relative overflow-hidden">
				<div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400 rounded-full blur-2xl -mr-10 -mt-10"></div>
				<div className="relative z-10">
					<h3 className="text-xl font-bold mb-3 flex items-center gap-2">
						<MessageSquare size={20} />
						Live Chat
					</h3>
					<p className="text-emerald-100 mb-6 text-sm">
						Need immediate assistance? Start a live chat with one of our
						available agents.
					</p>
					<button className="w-full py-3 bg-white text-emerald-900 font-bold rounded-xl hover:bg-emerald-50 transition-colors"
						type="button">
						Start Chat
					</button>
				</div>
			</div>
		</div>
	);
};

export default ContactInfo;
