import { Component, OnInit } from '@angular/core';
import { GradeService } from '../../services/grade-service';
import { Note } from '../../models/note';
import { ResultPipe } from '../../pipes/result-pipe';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-grade-list',
	imports: [
		ResultPipe,
		FormsModule,
	],
	templateUrl: './grade-list.html',
	styleUrl: './grade-list.css',
})
export class GradeListComponent implements OnInit
{
	public notes: Array<Note> = [];
	public newStudentModel = "";
	public newStudentGradeModel = 0;

	constructor(private gradeService: GradeService)
	{
	}

	ngOnInit()
	{
		const notes = [
			{ student: "Olga", grade: 14 },
			{ student: "Carina", grade: 12 },
			{ student: "Erica", grade: 18 },
			{ student: "Mike", grade: 20 },
			{ student: "Mohamed-Ali", grade: 0 },
			{ student: "Clovis", grade: 7 },
			{ student: "Zakaria", grade: 6 },
			{ student: "Josué", grade: 6 },
		];

		for (const note of notes) {
			this.gradeService.addGrade(note.student, note.grade);
		}

		this.gradeService.getNotes().subscribe((notes) => {
			this.notes = notes;
		});
	}

	addNote()
	{
		this.gradeService.addGrade(
			this.newStudentModel,
			this.newStudentGradeModel,
		);
	}
}
