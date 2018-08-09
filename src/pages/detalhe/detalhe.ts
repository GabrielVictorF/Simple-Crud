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
  private item_empresa = [];
  private nivel;
  private nome;

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider,
  public functions: FunctionsProvider, public alertCtrl: AlertController ) {

    this.item = this.navParams.get('item');
    this.nivel = localStorage.nivel;
    if (this.item.localizacao_empresa != null) {
      this.api.getEmpresaRelation(this.item.localizacao_empresa).subscribe(res => {
        this.item_empresa = res;
      });
    }
    this.api.infoUser(this.item.ownerId).subscribe(res => { 
      if (res.nome == null)
        this.nome = 'Desconhecido';
      else
        this.nome = res.nome;
      console.log(this.item);
      },
      Error => {
        console.log(Error);
      });
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

  adicionar() {
    this.navCtrl.push(AdicionarPage, {tipo: this.item.___class});
  }

  perfil() {
    this.navCtrl.push(PerfilPage);
  }

  diminuir() {
    const alert = this.alertCtrl.create({
      title: 'Quantidade',
      message: 'Quanto foi retirado?',
      inputs: [
        {
          name: 'quantidade',
          placeholder: 'Quantidade...',
          type: 'number'
        }
      ],
      buttons: [{
        text: 'OK',
        handler: data => {
          data.quantidade = this.item.quantidade - data.quantidade;
          this.api.atualizaQuantidade(data.quantidade, this.item.objectId).subscribe(res => {
            console.log(res);
            this.item = res;
            this.functions.mostraToast('Feito!');
          },
          Error => {
            console.log(Error);
          });
        }
      },
      {
        text: 'Cancelar'
      }]
    });
    alert.present();
  }

  aumentar() {
    const alert = this.alertCtrl.create({
      title: 'Quantidade',
      message: 'Adicionar quanto?',
      inputs: [
        {
          name: 'quantidade',
          placeholder: 'Quantidade...',
          type: 'number'
        }
      ],
      buttons: [{
        text: 'OK',
        handler: data => {
         data.quantidade = this.item.quantidade + parseInt(data.quantidade);
          this.api.atualizaQuantidade(data.quantidade, this.item.objectId).subscribe(res => {
            console.log(res);
            this.item = res;
            this.functions.mostraToast('Feito!');
          },
          Error => {
            console.log(Error);
          });
        }
      },
      {
        text: 'Cancelar'
      }]
    });
    alert.present();
  }
}
