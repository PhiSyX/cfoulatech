import { Component, OnInit } from "@angular/core";
import { InternService } from './intern.service';
import { CommonModule } from '@angular/common';
import { AddInternComponent } from './add-intern/add-intern.component';
import { ListRoomComponent } from './list-room/list-room.component';

@Component({
	selector: "app-service",
	imports: [CommonModule, AddInternComponent, ListRoomComponent],
	templateUrl: "./service.component.html",
	standalone: true,
	styleUrl: "./service.component.css",
})
export class ServiceComponent implements OnInit {
	public internList: Array<string> = [];

	constructor(private internService: InternService) {
	}

	ngOnInit(): void {
		this.internService.interns$.subscribe((data) => {
			this.internList = data;
		});
	}
}
