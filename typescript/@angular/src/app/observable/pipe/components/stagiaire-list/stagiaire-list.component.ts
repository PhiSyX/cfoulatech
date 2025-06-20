import { Component, OnInit } from "@angular/core";
import { StagiaireService } from "../../services/stagiaire.service";
import { Stagiaire } from "../../models/stagiaire";
import { map, take, tap } from "rxjs";
import { NgForOf } from "@angular/common";
import { ReversePipe } from '../../pipes/reverse.pipe';

@Component({
	selector: "app-stagiaire-list",
	imports: [
		NgForOf,
		ReversePipe,
	],
	templateUrl: "./stagiaire-list.component.html",
	styleUrl: "./stagiaire-list.component.css",
})
export class StagiaireListComponent implements OnInit {
	public stagiairesWeb: Array<Stagiaire> = []

	constructor(private stagiaireService: StagiaireService) {
	}

	ngOnInit() {
		this.stagiaireService.getStagiaires()
			.pipe(
				tap(stagiaires => console.log("Avant filtrage", stagiaires)),
				map(stagiaires => stagiaires.filter((stagiaire) => stagiaire.secteur === "Web")),
				tap(stagiaires => console.log("Après filtrage", stagiaires)),
				take(1),
			)
			.subscribe((stagiaires) => {
				this.stagiairesWeb = stagiaires;
			})
	}
}
