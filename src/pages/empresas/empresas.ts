import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';
import { FunctionsProvider } from '../../providers/functions/functions';

import { DetalhePage } from '../detalhe/detalhe';
import { AdicionarPage } from '../adicionar/adicionar';

import { Empresa } from '../../models/empresa';

@Component({
  templateUrl: 'empresas.html',
})

export class EmpresasPage {
  private data: Empresa;
  constructor(public api: ApiProvider, public navCtrl: NavController) {
    this.getEmpresas();
  }

  public getEmpresas(refresher?) {
    this.api.getEmpresaRelation().subscribe(res => {
      if (refresher)
          refresher.complete();
      this.data = res;
    });
  }

  detalhe(x) {
    this.navCtrl.push(DetalhePage, {item: x});
  }

  adicionar() {
    this.navCtrl.push(AdicionarPage, {tipo: 'empresa'})
  }

}