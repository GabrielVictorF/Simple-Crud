import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';
import { FunctionsProvider } from '../../providers/functions/functions';

import { DetalhePage } from '../detalhe/detalhe';

import { AdicionarPage } from '../adicionar/adicionar';

@Component({
  selector: 'page-usuarios',
  templateUrl: 'usuarios.html'
})

export class UsuariosPage {
  private data: any = [];
  constructor (public navCrtl: NavController, public api: ApiProvider) {
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
}