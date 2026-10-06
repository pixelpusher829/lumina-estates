import { APP_NAME } from "@/shared/data/constants";

interface SeoProps {
	title?: string;
	description?: string;
	image?: string;
}

/** Per-page metadata. React 19 hoists these tags into <head>. */
const Seo = ({ title, description, image }: SeoProps) => {
	const fullTitle = title
		? `${title} | ${APP_NAME}`
		: `${APP_NAME} — Find Your Perfect Property`;
	return (
		<>
			<title>{fullTitle}</title>
			{description && <meta name="description" content={description} />}
			<meta property="og:title" content={fullTitle} />
			{description && <meta property="og:description" content={description} />}
			{image && <meta property="og:image" content={image} />}
		</>
	);
};

export default Seo;
