import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nulo',
})
export class NuloPipe implements PipeTransform {
  transform(value) {
    if(value == 0 || value == null || value == '') {
      return 'Não definido'; 
    }
      return value;
  }
}