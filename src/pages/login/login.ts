import { Component } from '@angular/core';
import { NavController, NavParams, AlertController} from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { HomePage } from '../home/home';
import { CadastroPage } from '../cadastro/cadastro';
import { ResetSenhaPage } from '../reset-senha/reset-senha';
import { FunctionsProvider } from '../../providers/functions/functions';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {
  private user = {
    email: '',
    password: ''
  }
  constructor(public navCtrl: NavController, public api: ApiProvider, public alertCtrl: AlertController, public functions: FunctionsProvider) {
  }

  logar() {
    if (this.user.email == '' || this.user.password == '') {
      this.functions.mostraToast('Email / senha não podem estar vazios!');
    } else {
      this.api.login(this.user.email, this.user.password).subscribe(res => {
        this.functions.setPropriedadesUser(res);
        this.navCtrl.setRoot(HomePage);
      },
      Error => {
        console.log(Error);
        const message: string = this.functions.filtraErro(Error.error.code);
        this.functions.mostraAlert('Erro', message);
      });
  }}

  cadastrar() {
    this.navCtrl.push(CadastroPage);
  }

  resetSenha() {
    this.navCtrl.push(ResetSenhaPage);
  }
}
