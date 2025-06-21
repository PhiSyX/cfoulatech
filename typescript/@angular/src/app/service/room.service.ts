import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class RoomService
{
	private rooms: BehaviorSubject<Array<string>> = new BehaviorSubject(["Salle A", "Salle B"]);
	public rooms$ = this.rooms.asObservable();

	public addRoom(salle: string)
	{
		this.rooms.next([...this.rooms.value, salle])
	}
}
