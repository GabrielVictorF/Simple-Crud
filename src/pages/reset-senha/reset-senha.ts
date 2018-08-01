import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { FunctionsProvider } from '../../providers/functions/functions';

@Component({
  selector: 'page-reset-senha',
  templateUrl: 'reset-senha.html'
})

export class ResetSenhaPage {
  private user = {
    email: '',
    password: ''
  }
  constructor(public navCtrl: NavController, public api: ApiProvider, public functions: FunctionsProvider) {

  }

  resetSenha() {
    this.api.resetSenha(this.user.email).subscribe(res => {
      this.functions.mostraToast('Um email com sua nova senha foi enviado!');
      this.navCtrl.pop();
    },
    Error => {
      this.functions.mostraToast('Erro');
      console.log(Error);
    });
  }
}