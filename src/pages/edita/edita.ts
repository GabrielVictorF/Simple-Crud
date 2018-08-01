import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { DetalhePage } from '../detalhe/detalhe';
import { FunctionsProvider } from '../../providers/functions/functions';
import { ApiProvider } from '../../providers/api/api';
import { Item } from '../../models/item';
import { Usuario } from '../../models/usuario';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-edita',
  templateUrl: 'edita.html'
})

export class EditaPage {
  public item;
  constructor(public navCtrl: NavController, public functions: FunctionsProvider,
  public navParams: NavParams, public api: ApiProvider, public alertCtrl: AlertController) {
    this.item = this.navParams.get('item');
  }

  editar() {
    this.api.editaItem(this.item).subscribe(res => {
      this.functions.mostraToast(this.item.nome +  ' editado!');
      this.navCtrl.pop();
      },
      Error => {
        console.log(Error);
        this.functions.mostraToast('Erro ao editar item!');
    });
  }

  editaUser() {
    this.api.editaUser(this.item).subscribe(res => {
      if (res.nivel > 1)
        this.functions.mostraToast('Permissão a nível de sofware adicionada, para nível de hardware acessar o painel!');
      console.log(res);
      this.navCtrl.pop();
    });
  }
}