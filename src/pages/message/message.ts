import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { FunctionsProvider } from '../../providers/functions/functions';

import { DetalhePage } from '../detalhe/detalhe';
import { AdicionarPage } from '../adicionar/adicionar';
import { PerfilPage } from '../perfil/perfil';
import { UsuariosPage } from '../usuarios/usuarios';
import { HomePage } from '../home/home';
@Component({
  selector: 'page-message',
  templateUrl: 'message.html'
})

export class MessagePage {
  message: string;
  data: any = [];
  nivel: number;
  constructor(public api: ApiProvider, public navCtrl: NavController, public functions: FunctionsProvider) {
    this.nivel = localStorage.nivel;
    if (this.nivel > 1)
      this.getMessages();
  }

  getMessages() {
    this.api.getMessages().subscribe(res => {
      console.log(res);
      this.data = res;
    });
  }

  enviaMensagem() {
    this.api.enviaMensagem(this.message).subscribe(res => {
      console.log(res);
      this.functions.mostraToast("Mensagem enviada!");
    });
  }

  detalhe(item) {
    this.navCtrl.push(DetalhePage, {item: item});
  }

  adicionar() {
    this.navCtrl.push(AdicionarPage, {tipo: 'produto'});
  }

  perfil() {
    this.navCtrl.push(PerfilPage);
  }

  usuarios() {
    this.navCtrl.push(UsuariosPage);
  }

  homePage() {
    this.navCtrl.push(HomePage);
  }
}