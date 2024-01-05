import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  LoadingOptions,
  ToastOptions,
  ToastController,
  AlertOptions,
  ModalController,
} from '@ionic/angular';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  alertCtrl = inject(AlertController);
  toastController = inject(ToastController);
  modalControler = inject(ModalController);
  constructor(
    private loadingControler: LoadingController,
    private router: Router
  ) {}
  //Loading
  async presentLoading(opts: LoadingOptions) {
    const loading = await this.loadingControler.create(opts);
    await loading.present();
  }
  async dismissLoading() {
    await this.loadingControler.dismiss();
  }
  //Storage
  setLocalStroage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value));
  }
  getLocalStroage(key: string) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
  removeLocalStroage(key: string) {
    return localStorage.removeItem(key);
  }
  //Router
  routerLink(path: string) {
    return this.router.navigateByUrl(path, { replaceUrl: true });
  }
  //Alert
  async presentToast(opts: ToastOptions) {
    const toast = await this.toastController.create(opts);
    toast.present();
  }
  async showAlert(opts: AlertOptions) {
    const alert = await this.alertCtrl.create(opts);
    await alert.present();
  }
  //Modal
  async presentModal(opts?: any) {
    const modal = await this.modalControler.create(opts);
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if(data) return data;
  }
 async dismissModal(data?: any) {
    await this.modalControler.dismiss(data);
 }
 //progress percentage
  getPercentage(task: Task) {
    let completed=task.items!.filter((item: any) => item.done).length;
    let total=task.items!.length;
    let percentage=(completed/total)*100;
    return parseInt(percentage.toString());
  }
}
