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
import { Empresa } from '../../models/empresa';
@Component({
  selector: 'page-detalhe',
  templateUrl: 'detalhe.html'
})
export class DetalhePage {
  private item: Item; 
  private item_empresa: Empresa = new Empresa;
  private nivel: number; //1 - Comum, 2 - Adm, 3 - Owner
  private nome: string; //No lugar do PIPE
  private arrow_icon: string; //Arrow-down || Arrow-up

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider,
  public functions: FunctionsProvider, public alertCtrl: AlertController ) {
    this.arrow_icon = "arrow-down";
    this.item = this.navParams.get('item');
    this.nivel = localStorage.nivel;
    if (this.item.localizacao_empresa != 'n/a') {
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

  private mudaIcon() {
    if (this.arrow_icon.includes('arrow-down'))
      this.arrow_icon = "arrow-up";
    else
      this.arrow_icon = "arrow-down";
  }

  deletar() {
    let tipo = {
      pronome: 'esse',
      nome: ''
    };
    switch (this.item.___class) {
      case 'Users': 
        tipo.nome = "usuario";
        break;
      case 'produto':
        tipo.nome = "item";
        break;
      case 'feedback':
        tipo.nome = "mensagem";
        tipo.pronome = "essa";
        break;
    }
    
    const confirm = this.alertCtrl.create({
      title: '<div class="card text-white bg-danger mb-3"><div class="card-header">Um momento...</div></div>',
      message: '<div class="alert alert-dark" role="alert">Tem certeza que quer excluir ' + tipo.pronome + ' ' + tipo.nome + '?</div>',
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
            } else if (this.item.___class == 'feedback') {
              this.functions.mostraToast('Mensagem deletada!');
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
      title: '<div class="card text-white bg-danger mb-3"><div class="card-header">Quantidade</div></div>',
      message: '<div class="alert alert-dark" role="alert">Quanto foi retirado?</div>',
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
          if ((this.item.quantidade - data.quantidade) < 0 )
            this.functions.mostraToast('Estoque não pode ser negativo!');
          else {
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
        }},
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
