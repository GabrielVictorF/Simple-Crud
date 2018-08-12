import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'data',
})
export class DataPipe implements PipeTransform {
  transform(value) {
    if (value != null) {
      var dateVal ="/Date(" + value + ")/";
      var date = new Date( parseFloat( dateVal.substr(6 )));
      return date.toLocaleString();
    }
    return value;
  }
}