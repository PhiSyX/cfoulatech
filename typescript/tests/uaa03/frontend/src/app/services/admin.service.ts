import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService
{
  public static API_ENDPOINT: string = 'http://localhost:3000/admins';

  constructor()
  {
  }
}
