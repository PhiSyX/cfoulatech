import { Component, OnInit } from "@angular/core";
import { InternService } from "../../services/intern.service";
import { Intern } from "../../models/intern";
import { map, take, tap } from "rxjs";
import { NgForOf } from "@angular/common";
import { ReversePipe } from '../../pipes/reverse.pipe';

@Component({
	selector: "app-intern-list",
	imports: [
		NgForOf,
		ReversePipe,
	],
	templateUrl: "./intern-list.component.html",
	styleUrl: "./intern-list.component.css",
})
export class InternListComponent implements OnInit
{
	public internsWeb: Array<Intern> = []

	constructor(private stagiaireService: InternService)
	{
	}

	ngOnInit()
	{
		this.stagiaireService.getStagiaires()
			.pipe(
				tap(interns => console.log("Avant filtrage", interns)),
				map(interns => interns.filter((intern) => intern.sector === "Web")),
				tap(interns => console.log("Après filtrage", interns)),
				take(1),
			)
			.subscribe((interns) => {
				this.internsWeb = interns;
			})
	}
}
