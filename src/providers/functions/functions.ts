import { Injectable } from '@angular/core';
import { ToastController, AlertController } from 'ionic-angular';

import { DetalhePage } from '../../pages/detalhe/detalhe';

@Injectable()
export class FunctionsProvider {
  constructor(public toastCtrl: ToastController, public alertCtrl: AlertController) {

  }

  mostraToast(message: string) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();  
  }

  mostraAlert(title: string, message: string) {
  	const alert = this.alertCtrl.create({
    	title: title,
        message: message,
        buttons: ['OK']
    });
    alert.present();
  }

  filtraErro(erroCode) {
    switch (erroCode) {
      case 999:
        return 'Limite de requisições por segundo exaurido';
      //Data service
      case 1000:
        return 'ID de entidade não encontrado';
      //User Service
      case 3000:
        return 'Esta conta foi desabilitada';
      case 3003:
        return 'Email / senha inválidos';
      case 3006:
        return 'Email / senha não podem estar vazios';
      case 3036:
        return 'O e-email inserido já está cadastrado';
      case 3040:
        return 'Insira um e-email válido';
    } 
  }

  setPropriedadesUser(res) {
    localStorage.setItem("nivel", res.nivel); //1 = comum; 2 = ADM; 3 = Owner
    localStorage.setItem("userToken", res["user-token"]); //Token para reqs posteriores
    localStorage.setItem("userId", res.objectId); //Id do usuário
  }

  deletePropriedadesUser() {
    localStorage.removeItem("userId");
    localStorage.removeItem("nivel");
    localStorage.removeItem("userToken");
  }
}