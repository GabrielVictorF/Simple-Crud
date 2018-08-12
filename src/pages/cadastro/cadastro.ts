import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { FunctionsProvider } from '../../providers/functions/functions';

@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html'
})

export class CadastroPage {
  private user = {
    email: '',
    password: '',
    nome: '',
    idade: ''
  }
  private password2: string;

  constructor(public navCtrl: NavController, public api: ApiProvider, public functions: FunctionsProvider) {

  }

  cadastrar() {
    if (this.user.email == '' || this.user.password == '' || this.user.idade == '')
      this.functions.mostraToast('Preencha todos os campos!');
     else if (this.user.password != this.password2)
      this.functions.mostraToast('As senhas não condizem!');
    else {
      this.api.cadastra(this.user).subscribe(res => {
        this.functions.mostraAlert('Cadastro efetuado com sucesso!', 'Basta logar agora :D');
        this.navCtrl.pop();
      },
      Error => {
        console.log(Error);
        const message = this.functions.filtraErro(Error.error.code);
        this.functions.mostraAlert('Erro ao criar conta!', message);
      });
    }
  }
}