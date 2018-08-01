import { Component } from '@angular/core';
import { ApiProvider } from '../../providers/api/api';
import { FunctionsProvider } from '../../providers/functions/functions';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})

export class PerfilPage {
  private user: any = [];
  constructor(public navCtrl: NavController, public functions: FunctionsProvider,
  public api: ApiProvider) {
    this.api.infoUser(localStorage.userId).subscribe(res => {
      this.user = res;
      console.log(this.user);
    });
  }
}