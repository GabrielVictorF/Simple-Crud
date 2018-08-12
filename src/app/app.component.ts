import { Component } from '@angular/core';
import { Platform, LoadingController, AlertController } from 'ionic-angular';

import { LoginPage } from '../pages/login/login';
import { ApiProvider } from '../providers/api/api';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform, public api: ApiProvider, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {
    platform.ready().then(() => {
      if (localStorage.userToken) {
        console.log(localStorage.userToken);
        this.api.validaToken().subscribe(res => {
          if (res) {
            this.rootPage = HomePage;
          } else {
            const alert = this.alertCtrl.create({
              title: 'Sessão expirou!',
              message: 'Sua sessão expirou, por favor logue novamente.',
              buttons: [{
                text: 'OK',
                handler: () => {
                  this.api.logout().subscribe(res => {
                    const load = this.loadingCtrl.create({
                    content: 'Saindo...'
                  });
                  load.present();
                  this.api.logout().subscribe(res => {
                    load.dismiss();
                    localStorage.removeItem("userId");
                    localStorage.removeItem("nivel");
                    localStorage.removeItem("userToken");
                    this.rootPage = LoginPage;
                  });
                });
              }
            }]
          });
            alert.present(); 
          }
        });
      } else {
        this.rootPage = LoginPage;
      }    
    });
  }
}
