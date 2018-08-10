//Components
import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, NavParams } from 'ionic-angular';

//Pages
import { DetalhePage } from '../detalhe/detalhe';
import { AdicionarPage } from '../adicionar/adicionar';
import { LoginPage } from '../login/login';
import { PerfilPage } from '../perfil/perfil';
import { UsuariosPage } from '../usuarios/usuarios';
import { MessagePage } from '../message/message';
import { EmpresasPage } from '../empresas/empresas';

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
              public alertCtrl: AlertController, public navParams: NavParams) {
    this.getProdutos();
    this.nivel = localStorage.nivel;
  }

  getProdutos(refresher?) {
    const load = this.loadingCtrl.create({
      content: 'Obtendo favoritos...'
    });
    load.present();
    this.api.getProdutos().subscribe(res => {
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
                  this.functions.deletePropriedadesUser();
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

  page() {
    //this.offset += 10;
    this.navCtrl.push(HomePage, {offset: 10});
  }

  detalhe(x) {
    this.navCtrl.push(DetalhePage, {item: x});
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

  getItems(ev: any) {
    let val = ev.target.value;
   	this.api.getPesquisa(val).subscribe(res => {
   		this.data = res
    });
   	console.log(this.data);
  }

  empresasPage() {
    this.navCtrl.push(EmpresasPage);
  }
}
