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
}