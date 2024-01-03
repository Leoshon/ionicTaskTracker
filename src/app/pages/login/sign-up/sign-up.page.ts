import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  form=new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor(private fireBaseServ: FirebaseService, private utilServ : UtilsService) { }

  ngOnInit() {
  }
  async onSubmit(){
    await this.utilServ.presentLoading({message: 'Please wait...'});

    return await this.fireBaseServ.register(this.form.value as User).then(async (res)=>{
      console.log(res);
      await this.fireBaseServ.updateUser({displayName: this.form.value.name});
      let user={
        uid: res.user.uid,
        email: res.user.email,
        name: this.form.value.name
      }
      this.utilServ.setLocalStroage('user', user);
      this.utilServ.routerLink('/tabs');
      this.form.reset();
    }).catch((err)=>{console.log(err)})
    .finally(async ()=>{
      await this.utilServ.dismissLoading();
    });
  }

}
