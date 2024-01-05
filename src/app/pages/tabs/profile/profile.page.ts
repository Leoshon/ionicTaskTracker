import { Component, OnInit, inject } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  usuario = {} as User;
 utilServ=inject(UtilsService);
  constructor() { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.getUsuario();
  }
  getUsuario() {
    return this.usuario = this.utilServ.getLocalStroage('user');
  }
}
