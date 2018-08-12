import { Pipe, PipeTransform } from '@angular/core';
import { ApiProvider } from '../../providers/api/api';

@Pipe({
  name: 'proprietario',
})
export class ProprietarioPipe implements PipeTransform {

  constructor(public api: ApiProvider){
    
  } 

  transform(value) {
    // if (value == localStorage.userId) 
    //   return 'Eu';
    if (value == null) 
      return 'Público';
    else {
      console.log(value);
      this.api.infoUser(value).subscribe(res => {
        console.log(res.name);
       return res.name;
      });
    }
    // }
    //   return value;
  }
}