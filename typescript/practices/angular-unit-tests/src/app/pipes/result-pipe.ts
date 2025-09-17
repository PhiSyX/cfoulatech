import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "result" })
export class ResultPipe implements PipeTransform
{
	transform(grade: number): "Admis" | "Ajourné"
	{
		if (grade >= 10) return "Admis";
		return "Ajourné";
	}
}
