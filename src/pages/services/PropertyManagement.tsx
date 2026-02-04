import { Key } from "lucide-react";
import type React from "react";
import propertyImg from "@/shared/images/services/property.webp";
import tenantImg from "@/shared/images/services/tenant.webp";

const PropertyManagement: React.FC = () => {
	return (
		<section className="py-24 relative z-10">
			<div className="container mx-auto px-6">
				<div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
					{/* Text Content */}
					<div className="lg:w-1/2 relative z-10">
						<div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-400 mb-6">
							<Key size={24} />
						</div>
						<h2 className="text-4xl font-bold text-slate-900 mb-6">
							Effortless Property <br />
							Management
						</h2>
						<p className="text-lg text-slate-600 leading-relaxed mb-8">
							Your time is your most valuable asset. We handle the 3 a.m. calls,
							the maintenance coordination, and the tenant screening. You simply
							receive the monthly deposit and a detailed performance report.
						</p>
						<div className="flex gap-3">
							<span className="px-4 py-2 bg-slate-50 rounded-full text-slate-600 text-sm font-medium">
								Tenant Screening
							</span>
							<span className="px-4 py-2 bg-slate-50 rounded-full text-slate-600 text-sm font-medium">
								24/7 Support
							</span>
						</div>
					</div>

					{/* Asymmetrical Image Cluster */}
					<div className="lg:w-1/2 w-full relative">
						<div className="relative z-10 w-6/7">
							<img
								src={propertyImg}
								alt="Luxury Home Exterior"
								className="rounded-[3rem] shadow-2xl w-full object-cover h-120"
							/>
						</div>
						{/* Floating Overlay Image */}
						<div className="absolute -bottom-8 right-0 w-2/6 z-20">
							<img
								src={tenantImg}
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
	);
};

export default PropertyManagement;
