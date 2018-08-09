import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';
import { FunctionsProvider } from '../../providers/functions/functions';

import { DetalhePage } from '../detalhe/detalhe';

import { AdicionarPage } from '../adicionar/adicionar';
import { PerfilPage } from '../perfil/perfil';
import { MessagePage } from '../message/message';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-usuarios',
  templateUrl: 'usuarios.html'
})

export class UsuariosPage {
  private data: any = [];
  constructor (public navCrtl: NavController, public api: ApiProvider, public alertCtrl: AlertController,
  public loadingCtrl: LoadingController, public functions: FunctionsProvider) {
    this.getUsuarios();
  }

  
  detalhe(x) {
    this.navCrtl.push(DetalhePage, {item: x});
  }

  getUsuarios(refresher?) {
    this.api.infoUser().subscribe(res => {
      if (refresher)
          refresher.complete();
      this.data = res;
    });
  }

  addUser() {
    this.navCrtl.push(AdicionarPage, {tipo: 'User'});
  }

  adicionar() {
    this.navCrtl.push(AdicionarPage, {tipo: 'produto'});
  }

   perfil() {
    this.navCrtl.push(PerfilPage);
  }

  message() {
    this.navCrtl.push(MessagePage);
  }

  logout() {
    const confirm = this.alertCtrl.create({
      title: 'Opa',
      message: 'Tem certeza que deseja sair?',
      buttons: [{
        text: 'Sim',
        handler: () => {
          const load = this.loadingCtrl.create({
          content: 'Saindo...'
        });
          load.present();
          this.api.logout().subscribe(res => {
            load.dismiss();
            this.functions.deletePropriedadesUser();
            this.navCrtl.setRoot(LoginPage);
          },
          Error => {
            console.log(Error);
          });
        }
      },
      {
        text: 'Não'
      }]
    });
    confirm.present();
  }

}