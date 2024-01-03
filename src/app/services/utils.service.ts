import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, LoadingOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private loadingControler:LoadingController, private router:Router) { }
  async presentLoading(opts: LoadingOptions) {
    const loading = await this.loadingControler.create(opts);
    await loading.present();
  }
  async dismissLoading() {
    await this.loadingControler.dismiss();
  }
  setLocalStroage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value));
  }
  getLocalStroage(key: string) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
  routerLink(path: string) {
    return this.router.navigateByUrl(path, { replaceUrl: true });
  }
}
