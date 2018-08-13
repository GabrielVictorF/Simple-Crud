import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { FunctionsProvider } from '../../providers/functions/functions';

@Component({
  selector: 'page-adicionar',
  templateUrl: 'adicionar.html'
})
export class AdicionarPage {
  public item = {
    nome: '',
    quantidade: '',
    preco: '',
    localizacao: ''
  }

  private user = {
    email: '',
    password: '',
    nome: '',
    idade: ''
  }

  private tipo: string;
  constructor(public navCtrl: NavController, public api: ApiProvider, private functions: FunctionsProvider, public navParams: NavParams) {
    this.tipo = this.navParams.get('tipo'); 
  }

  adicionar() {
    this.api.adicionarItem(this.item).subscribe(res => {
      this.functions.mostraToast(this.item.nome + ' adicionado com sucesso!');
      this.navCtrl.pop();
      console.log(res)
    },
    Error => {
      console.log(Error);
    });    
  }

  cadastrar() {
    if (this.user.email == '' || this.user.password == '' || this.user.idade == '')
      this.functions.mostraToast('Preencha todos os campos!');
    //  else if (this.user.password != this.password2)
    //   this.functions.mostraToast('As senhas não condizem!');
    else {
      this.api.cadastra(this.user).subscribe(res => {
        this.functions.mostraAlert('Cadastro efetuado com sucesso!', 'Agora é só ir na sua caixa de e-mail e confirmar a sua conta'); 
        this.navCtrl.pop();
      },
      Error => {
        console.log(Error);
        const message = Error.error.code;
        this.functions.mostraAlert('Erro ao criar conta!', message);
      });
    }
  }
}
