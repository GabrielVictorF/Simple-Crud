import { Component } from '@angular/core';
import { NavController, NavParams, AlertController} from 'ionic-angular';
import { EditaPage } from '../edita/edita';
import { HomePage } from '../home/home';
import { ApiProvider } from '../../providers/api/api';
import { FunctionsProvider} from '../../providers/functions/functions';

import { AdicionarPage } from '../adicionar/adicionar';
import { LoginPage } from '../login/login';
import { PerfilPage } from '../perfil/perfil';

import { Item } from '../../models/item';
@Component({
  selector: 'page-detalhe',
  templateUrl: 'detalhe.html'
})
export class DetalhePage {
  private item; 
  private nivel;

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider,
  public functions: FunctionsProvider, public alertCtrl: AlertController ) {
    this.item = this.navParams.get('item');
    this.nivel = localStorage.nivel;
    console.log(this.item);
  }
  private edita() {
    this.navCtrl.push(EditaPage, {'item': this.item});
  }

  deletar() {
    let tipo: string;
    if (this.item.___class.includes('Users')) {
      tipo = "usuário";
    } else {
      tipo = "item";
    }
    const confirm = this.alertCtrl.create({
      title: 'Um momento...',
      message: 'Tem certeza que quer excluir esse ' + tipo + '?',
      buttons: [{
        text: 'Sim',
        handler: () => { 
          this.api.deleta(this.item.objectId, this.item.___class).subscribe(res => {
            if (this.item.___class == 'favoritos') {
              this.functions.mostraToast('Item Deletado!');
              this.navCtrl.setRoot(HomePage);
            } else if (this.item.___class == 'Users') {
               this.functions.mostraToast('Usuário Deletado!');
              this.navCtrl.pop();
            }
          },
          Error => {
            console.log(Error);
          });
        }},
        {
          text: 'Não',
          handler: () => { console.log('Não') }
        }
      ]
    });
    confirm.present();
}

detalhe(x) {
    this.navCtrl.push(DetalhePage, {item: x});
  }

  adicionar() {
    this.navCtrl.push(AdicionarPage);
  }

  perfil() {
    this.navCtrl.push(PerfilPage);
  }
}
