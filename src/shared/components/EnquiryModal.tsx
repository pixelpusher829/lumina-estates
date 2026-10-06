import type { Id } from "@convex/_generated/dataModel";
import EnquiryForm from "./EnquiryForm";
import Modal from "./Modal";

interface EnquiryModalProps {
	kind: "tour" | "agent" | null;
	onClose: () => void;
	listing: { _id: Id<"listings">; title: string };
	agentName?: string;
}

const EnquiryModal = ({
	kind,
	onClose,
	listing,
	agentName,
}: EnquiryModalProps) => {
	const isTour = kind === "tour";
	const firstName = agentName?.split(" ")[0];

	return (
		<Modal
			open={kind !== null}
			onClose={onClose}
			title={isTour ? "Request a tour" : `Contact ${agentName ?? "the agent"}`}
			description={listing.title}
			size="lg"
		>
			{kind && (
				<EnquiryForm
					key={kind}
					kind={kind}
					listingId={listing._id}
					submitLabel={isTour ? "Request Tour" : "Send Message"}
					defaultMessage={
						isTour
							? `Hi, I'd like to arrange a viewing of ${listing.title}. I'm usually available `
							: `Hi${firstName ? ` ${firstName}` : ""}, I'm interested in ${listing.title} and would like more information.`
					}
					successContent={
						<>
							<h3 className="text-xl font-bold text-slate-900 mb-2">
								{isTour ? "Tour requested" : "Message sent"}
							</h3>
							<p className="text-slate-500">
								{agentName ?? "Our team"} will be in touch shortly
								{isTour ? " to confirm a time." : "."}
							</p>
						</>
					}
				/>
			)}
		</Modal>
	);
};

export default EnquiryModal;
