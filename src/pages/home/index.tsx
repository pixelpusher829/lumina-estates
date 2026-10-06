import Seo from "@/shared/components/Seo";
import Cta from "./Cta";
import FeaturedProperties from "./FeaturedProperties";
import Hero from "./Hero";
import Neighbourhoods from "./Neighbourhoods";
import Services from "./Services";
import Testimonials from "./Testimonials";

const Home = () => {
	return (
		<div className="min-h-screen">
			<Seo description="Discover premium homes, apartments and villas for sale and rent with Lumina Estates." />
			<Hero />
			<Services />
			<FeaturedProperties />
			<Neighbourhoods />
			<Testimonials />
			<Cta />
		</div>
	);
};

export default Home;
