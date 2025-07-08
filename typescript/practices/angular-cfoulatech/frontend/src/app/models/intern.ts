import { Trainer } from './trainer';

export interface Intern
{
	id?: string;
	name: string;
	email: string;
	phone: string;
	trainerId?: string;
	trainer?: Trainer;
}
