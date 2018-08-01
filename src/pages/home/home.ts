//Components
import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

//Pages
import { DetalhePage } from '../detalhe/detalhe';
import { AdicionarPage } from '../adicionar/adicionar';
import { LoginPage } from '../login/login';
import { PerfilPage } from '../perfil/perfil';
import { UsuariosPage } from '../usuarios/usuarios';

//Providers
import { ApiProvider } from '../../providers/api/api';
import { FunctionsProvider } from '../../providers/functions/functions';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public data: any = [];
  private nivel: number;

  constructor(public navCtrl: NavController, public api: ApiProvider, 
  public loadingCtrl: LoadingController, public functions: FunctionsProvider,
  public alertCtrl: AlertController) {
    this.getFavoritos();
    this.nivel = localStorage.nivel;
  }

  getFavoritos(refresher?) {
    const load = this.loadingCtrl.create({
      content: 'Obtendo favoritos...'
    });
    load.present();
    this.api.getFavoritos().subscribe(res => {
      if (refresher)
          refresher.complete();
      load.dismiss();
      this.data = res;
      console.log(this.data);
    },
    Error => {
      console.log(Error);
      if (Error.error.code == 3064) {
        load.dismiss();
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
                  this.navCtrl.setRoot(LoginPage);
                });
              });
            }
          }]
        });
        alert.present(); 
      }
    });
  }

  detalhe(x) {
    this.navCtrl.push(DetalhePage, {item: x});
  }

  adicionar() {
    this.navCtrl.push(AdicionarPage, {tipo: 'favoritos'});
  }

  perfil() {
    this.navCtrl.push(PerfilPage);
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
            localStorage.removeItem("userId");
            localStorage.removeItem("nivel");
            localStorage.removeItem("userToken");
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

  usuarios() {
    this.navCtrl.push(UsuariosPage);
  }
 }
