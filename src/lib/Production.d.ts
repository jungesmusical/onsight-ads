type Image = {
	src: string;
	alt: string;
	width: number;
	height: number;
	focus: string;
	srcset: {
		avif: string;
		webp: string;
		default: string;
	};
};

type Video = {
	src: string;
	mimeType: string;
	poster: string | null;
};

type Person = {
	uuid: string;
	name: string;
	sortableName: string;
	image: Image | null;
};

type Location = {
	type: 'physical' | 'virtual';
	name: string;
	address?: {
		streetAddress: string;
		postalCode: string;
		addressLocality: string;
	};
	url?: string;
};

/** `members` sind UUIDs, aufzulösen über `Production.people`. */
type Role = {
	roleName: string;
	members: string[];
};

type CastRole = Role & {
	walkInCover: boolean;
};

type OrchestraRole = CastRole & {
	walkInMembers: string[];
};

type ProductionEvent = {
	id: string;
	uuid: string;
	name: string | null;
	startDate: string;
	isPublic: boolean;
	displayNumber: number | null;
	offers?: { url: string };
	companies: string[];
	cast: CastRole[];
	ensemble: string[];
	conductors: string[];
	orchestra: OrchestraRole[];
};

type GalleryProduction = {
	uuid: string;
	slug: string;
	name: string;
	location: string;
	year: string;
	images: Image[];
	photographers: string[];
};

type ExternalAd = {
	company: string;
	media: (Image & { type: 'image' }) | (Video & { type: 'video' }) | null;
};

type Production = {
	uuid: string;
	slug: string;
	name: string;
	shortName: string;
	url: string;
	startDate: string | null;
	endDate: string | null;
	location: Location | null;
	duration: string | null;
	intermission: string | null;
	companies: string[];
	disclaimer: string;
	image: Image | null;
	video: Video | null;
	creativeTeam: (Role & { lead: boolean })[];
	foh: Role[];
	events: ProductionEvent[];
	gallery: GalleryProduction[];
	externalAds: ExternalAd[];
	people: Record<string, Person>;
};

export { Production, ProductionEvent, Role, CastRole, OrchestraRole, Person, Image, Video };
