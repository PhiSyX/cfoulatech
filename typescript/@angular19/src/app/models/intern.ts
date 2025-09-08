import { Trainer } from './trainer';
import { Training } from './training';

export interface Intern
{
	id?: string;
	name: string;
	email: string;
	phone: string;
	trainerId?: string;
	trainer?: Trainer;
	trainings?: Array<Training>;
}
