import { PipeTransform, Pipe} from '@angular/core';
@Pipe({
	name:'customSort',
	pure:false // to dynamically redo this sorting when new item in the array
})
export class SortPipe implements PipeTransform{
	
	transform(value:any){
		console.log(value.sort(function(a,b){
			if(a.name > b.name){ return 1}
			if(a.name < b.name) {return -1}
			return 0
		}));
		return value;
	}

}