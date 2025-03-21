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
	};
	shows: SingleShow[];
};

export { ShowData, RolePersons, SingleShow };
