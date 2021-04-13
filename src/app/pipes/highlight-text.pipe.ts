import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightText'
})
export class HighlightTextPipe implements PipeTransform {

  transform(value: string, args: string): unknown {
    if (!args) {return value;} 

    var search = new RegExp(args, 'gi');  
    return value.replace(/(<([^>]+)>)/gi, "").replace(search, "<span class='highlighted'>$&</span>");
    
  }

}
  
 