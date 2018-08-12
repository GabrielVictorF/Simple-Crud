import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { FunctionsProvider } from '../../providers/functions/functions';

@Component({
  selector: 'page-reset-senha',
  templateUrl: 'reset-senha.html'
})

export class ResetSenhaPage {
  public user = {
    email: ''
  }
  constructor(public navCtrl: NavController, public api: ApiProvider, public functions: FunctionsProvider) {

  }

  resetSenha() {
    this.api.resetSenhaStep1(this.user.email).subscribe(res => {
      const id = res;
      console.log(res.objectId);
      this.api.resetSenhaStep2(res.objectId).subscribe(res => {
         this.functions.mostraToast('Um email com sua nova senha foi enviado!');
        this.navCtrl.pop();
      },
      Error => {
        console.log(Error);
      });
    },
    Error => {
      this.functions.mostraToast('Erro');
      console.log(Error);
    });
  }
}