import { Colour } from './../models/colour/colour';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colorPipe'
})
export class ColorPipePipe implements PipeTransform {

  transform(value: Colour[], filterText:string): Colour[] {
    filterText= filterText?filterText.toLocaleLowerCase():""
    return filterText?value
    .filter((c:Colour)=>c.color_name.toLocaleLowerCase().indexOf(filterText)!==-1):value
  }

}
