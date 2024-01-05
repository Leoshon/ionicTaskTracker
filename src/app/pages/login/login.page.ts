import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  constructor(
    private fireBaseServ: FirebaseService,
    private utilServ: UtilsService
  ) {}

  ngOnInit() {}
  async onSubmit() {
    try {
      await this.utilServ.presentLoading({ message: 'Please wait...' });
      await this.fireBaseServ
        .login(this.form.value as User)
        .then(async (res) => {

          let user = {
            uid: res.user.uid,
            email: res.user.email,
            name: res.user.displayName,
          };
          this.utilServ.setLocalStroage('user', user);
          this.form.reset();
        })
        .catch((err) => {
          this.utilServ.presentToast({
            message: err.message,
            header: 'Error',
            duration: 2000,
            position: 'top',
          });
        });
      this.utilServ.routerLink('/tabs/home');
    } catch (err) {
      console.log(err);
    } finally {
      await this.utilServ.dismissLoading();
    }
  }
}
