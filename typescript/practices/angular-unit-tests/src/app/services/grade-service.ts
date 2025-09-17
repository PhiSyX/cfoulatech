import { Injectable } from '@angular/core';
import { Note } from '../models/note';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
	providedIn: "root",
})
export class GradeService
{
	private notes: Array<Note> = [];
	private notes$ = new BehaviorSubject<Note[]>([]);

	getNotes(): Observable<Array<Note>>
	{
		return this.notes$;
	}

	getGrades(): Array<number>
	{
		return this.notes.map((n) => n.grade);
	}

	addGrade(student: string, grade: number)
	{
		this.notes.push({ student, grade });
		this.notes$.next([...this.notes]);
	}

	getAverage(): number
	{
		const grades = this.getGrades();
		const countGrade = grades.length;
		const sumGrade = grades.reduce((total, grade) => total + grade, 0);
		const avg = sumGrade / countGrade;
		return avg;
	}

	hasPassed(student: string): boolean
	{
		const note = this.notes.find((n) => n.student === student);
		if (!note) return false;
		return note.grade >= 10;
	}
}
