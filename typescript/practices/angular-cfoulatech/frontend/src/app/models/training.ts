export interface Training
{
	id?: string;
	title: string;
	description: string;
	goal: string;
	duration: number;
	level: "débutant" | "intermédiaire" | "avancé";
	startDate: string;
	endDate: string;
	status: "brouillon" | "publiée" | "archivée";
}
