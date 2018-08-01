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
        localStorage.setItem("nivel", res.nivel); //1 = comum; 2 = ADM
        console.log(localStorage.nivel);
        localStorage.setItem("userToken", res["user-token"]); //Token para reqs posteriores
        localStorage.setItem("userId", res.objectId); //Id do usuário
        this.navCtrl.setRoot(HomePage);
      },
      Error => {
        console.log(Error);
        if (Error.error.code == 3000) 
          this.functions.mostraAlert('Ixi', 'Esta conta foi desabilitada');
        else if (Error.error.code == 3003) 
          this.functions.mostraAlert('Ops', 'Email / senha incorretos!');
        else if (Error.error.code == 3087)
          this.functions.mostraAlert('Calma aí XD', 'Você primeiro precisa confirmar o e-mail cadastrado!');
      });
  }}

  cadastrar() {
    this.navCtrl.push(CadastroPage);
  }

  resetSenha() {
    this.navCtrl.push(ResetSenhaPage);
  }
}
