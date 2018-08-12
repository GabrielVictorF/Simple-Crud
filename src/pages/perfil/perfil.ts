import { Component } from '@angular/core';
import { ApiProvider } from '../../providers/api/api';
import { FunctionsProvider } from '../../providers/functions/functions';
import { NavController, AlertController, LoadingController } from 'ionic-angular';

import { AdicionarPage } from '../adicionar/adicionar';
import { PerfilPage } from '../perfil/perfil';
import { MessagePage } from '../message/message';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})

export class PerfilPage {
  private user: any = [];
  constructor(public navCtrl: NavController, public functions: FunctionsProvider,
  public api: ApiProvider, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    this.api.infoUser(localStorage.userId).subscribe(res => {
      this.user = res;
      if (!this.user.avatar) 
        this.user.avatar = "https://develop.backendless.com/FAA68423-49CB-CE65-FF5B-CB0FC0C7B600/console/fdleezxgcunaupxglanthtmxooxkqxsiphja/files/view/user/avatar/avatar.png";
      console.log(this.user);
    });
  }

  addUser() {
    this.navCtrl.push(AdicionarPage, {tipo: 'User'});
  }

  adicionar() {
    this.navCtrl.push(AdicionarPage, {tipo: 'produto'});
  }

   perfil() {
    this.navCtrl.push(PerfilPage);
  }

  message() {
    this.navCtrl.push(MessagePage);
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
            this.navCtrl.setRoot(LoginPage);
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