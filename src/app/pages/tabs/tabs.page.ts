import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor(private fireService:Auth, private utilServ:UtilsService) { }

  ngOnInit() {
  }
async  signOut(){
  try{
    await this.utilServ.presentLoading({message: 'Please wait...'});
    await this.fireService.signOut();
    this.utilServ.routerLink('/login');
    this.utilServ.removeLocalStroage('user');
  }
  catch(err){
    console.log(err);
  }
  finally{
    await this.utilServ.dismissLoading(); 

  }
} 
async presentAlertConfirm() {
  const alert = await this.utilServ.showAlert({
    cssClass: 'my-custom-class',
    header: 'Confirm!',
    message: '',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
       
      }, {
        text: 'Cerrar Sesión',
        handler:  () => {
          this.signOut();
          console.log('Confirm Okay');
        }
      }
    ]
  });

}
}
