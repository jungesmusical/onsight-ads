type RolePersons = {
	role: string;
	persons: string[];
	isWalkInCover: boolean;
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
	conductor: string;
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
			image: {
				source: Array<{ srcset: string; type: string }>;
				img: { src: string; srcset: string; alt: string };
			} | null;
			video: {
				source: Array<{ srcset: string; type: string }>;
				video: { poster: string | null };
			} | null;
		};
	};
	shows: SingleShow[];
};

export { ShowData, RolePersons, SingleShow };
