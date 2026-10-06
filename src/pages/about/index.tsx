import Seo from "@/shared/components/Seo";
import ByTheNumbers from "./ByTheNumbers";
import Careers from "./Careers";
import FounderNote from "./FounderNote";
import Hero from "./Hero";
import Mission from "./Mission";
import Story from "./Story";
import Team from "./Team";

const About = () => {
	return (
		<div className="min-h-screen pt-20 pb-24 bg-white overflow-hidden">
			<Seo
				title="About Us"
				description="Meet the team behind Lumina Estates and learn about our mission."
			/>
			<Hero />
			<Mission />
			<ByTheNumbers />
			<Story />
			<Team />
			<FounderNote />
			<Careers />
		</div>
	);
};

export default About;
