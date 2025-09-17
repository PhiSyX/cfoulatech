import { TestBed } from '@angular/core/testing';

import { GradeService } from './grade-service';

describe('GradeService', () => {
	let service: GradeService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(GradeService);

		for (const note of [
			{ student: "Olga", grade: 14 },
			{ student: "Carina", grade: 12 },
			{ student: "Erica", grade: 18 },
			{ student: "Mike", grade: 20 },
			{ student: "Mohamed-Ali", grade: 0 },
			{ student: "Clovis", grade: 7 },
			{ student: "Zakaria", grade: 6 },
			{ student: "Josué", grade: 6 },
		]) {
			service.addGrade(note.student, note.grade);
		}
	});

	it('vérifie la liste des notes', () => {
		expect(service.getGrades()).toEqual([
			14, 12, 18, 20, 0, 7, 6, 6,
		]);
	});

	it('calcule la moyenne de tous les étudiants', () => {
		expect(service.getAverage()).toBeGreaterThan(10);
	});

	it('vérifie si l\'étudiant a passé', () => {
		expect(service.hasPassed("Olga")).toBeTrue();

		expect(service.hasPassed("Zakaria")).toBeFalse();
		expect(service.hasPassed("abcd")).toBeFalse();
	});
});
