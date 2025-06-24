import { Pipe, PipeTransform } from "@angular/core";

type List = Array<Record<string, string>>;
type FilteredList = Array<Record<string, string>>;

@Pipe({ name: "search" })
export class SearchPipe implements PipeTransform
{
	transform(searchList: List, searchText: string): FilteredList
	{
		const searchTextLC = searchText.toLowerCase();
		return searchList.filter((search) => {
			return Object.values(search).some((val) => {
				const valLC = val.toLowerCase();
				return valLC.indexOf(searchTextLC) >= 0;
			})
		});
	}
}
