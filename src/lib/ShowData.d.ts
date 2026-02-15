type RolePersons = {
	role: string;
	persons: string[];
	isWalkInCover: boolean;
};

type SourceImage = {
	source: Array<{ srcset: string; type?: string }>;
	img: { src: string; srcset?: string; alt?: string; focus?: string };
};

type SingleShow = {
	isPublic: boolean;
	timestamp: string;
	ticketUrl: string;
	companies: string[];
	cast: {
		ensemble: string[];
		roles: RolePersons[];
	};
	conductor: string | null;
};

type ShowData = {
	common: {
		title: string;
		venue: {
			type: string;
			name: string;
			street: string;
			zip: string;
			city: string;
			url: string;
		};
		orchestra: RolePersons[];
		creativeTeam: (RolePersons & { lead: boolean })[];
		foh: RolePersons[];
		disclaimer: string?;
		media: {
			image: SourceImage?;
			video: {
				source: Array<{ src: string; type: string }>;
				video: { poster: string | null };
			} | null;
		};
		gallery: Array<{
			title: string;
			subtitle?: string;
			year: string;
			images: SourceImage[];
		}>;
	};
	shows: SingleShow[];
};

export { ShowData, RolePersons, SingleShow };
