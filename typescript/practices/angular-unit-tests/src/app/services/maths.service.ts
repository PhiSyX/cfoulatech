import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MathsService
{
    add(a: number, b: number): number
    {
        return a + b;
    }

    mul(a: number, b: number): number
    {
      return a * b;
    }

    div(a: number, b: number): number
    {
      if (b === 0) {
        throw new Error("Expected a positive integer");
      }
      return a / b;
    }
}
