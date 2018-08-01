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
        this.functions.mostraAlert('Cadastro efetuado com sucesso!', 'Agora é só ir na sua caixa de e-mail e confirmar a sua conta');
        this.navCtrl.pop();
      },
      Error => {
        console.log(Error);
        if (Error.error.code == 3033) 
          this.functions.mostraAlert('Erro ao criar conta!', 'O e-email inserido já está cadastrado!');
        else if (Error.error.code = 3040)
          this.functions.mostraToast('Insira um e-email válido');
        else 
          this.functions.mostraToast('Erro ao criar conta!');
      });
    }
  }
}