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
  }
  catch(err){
    console.log(err);
  }
  finally{
    await this.utilServ.dismissLoading(); 

  }
} 
}
