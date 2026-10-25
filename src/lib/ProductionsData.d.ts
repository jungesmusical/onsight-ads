type ProductionsData = {
	productions: Array<{
		uuid: string;
		slug: string;
		name: string;
		startDate: string | null;
		url: string;
		apiUrl: string;
	}>;
};

export { ProductionsData };
