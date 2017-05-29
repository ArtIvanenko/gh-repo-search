import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'repoSort'
})
export class RepoSortPipe implements PipeTransform {

	transform(value: any[], searchTerm: string, asc?: boolean): any {

		if(!searchTerm) {
			return value;
		}

		if(searchTerm) {

			return value.sort((prev, next) => {
		        if (searchTerm in prev && typeof prev[searchTerm] === 'number') {
		          return asc ? prev[searchTerm] - next[searchTerm] : next[searchTerm] - prev[searchTerm];
		        }
		        return 0;
		    });
		}

	}
}
