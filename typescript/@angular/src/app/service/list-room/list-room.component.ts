import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { RoomService } from '../room.service';

@Component({
	selector: 'app-list-room',
	imports: [
		NgForOf,
	],
	templateUrl: './list-room.component.html',
	styleUrl: './list-room.component.css',
})
export class ListRoomComponent implements OnInit {
	listRooms: Array<string> = [];

	constructor(private roomService: RoomService) {
	}

	ngOnInit(): void {
		this.roomService.rooms$.subscribe(((s) => {
			this.listRooms = s;
		}));
	}
}
