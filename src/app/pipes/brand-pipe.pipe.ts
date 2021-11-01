import { Pipe, PipeTransform } from '@angular/core';
import { Brand } from '../models/brand/brand';

@Pipe({
  name: 'brandPipe'
})

  export class BrandPipePipe implements PipeTransform {

    transform(value: Brand[], filterText:string): Brand[] {
      filterText= filterText?filterText.toLocaleLowerCase():""
      return filterText?value
      .filter((b:Brand)=>b.brand_name.toLocaleLowerCase().indexOf(filterText)!==-1):value
    }

}
