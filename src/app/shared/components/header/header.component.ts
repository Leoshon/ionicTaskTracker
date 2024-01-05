import { Component, Input, OnInit, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ThemeService } from 'src/app/services/theme.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  utilService=inject(UtilsService);

  @Input() title!: string;
  @Input() backButton!: string;
  @Input() showMenuButton!: boolean;
  @Input() isModal!: boolean;
  @Input() color!: string;
  @Input() centerTitle!: string;
  darckmode!: BehaviorSubject<boolean>;

  constructor(private themeServ:ThemeService) { }

  ngOnInit() {
    this.themeServ.darckMode.subscribe(()=>{
      this.darckmode = this.themeServ.darckMode;
    });
  }
  setMode(mode: boolean){
    this.themeServ.setMode(mode);
  }
  dismisModal(){
    this.utilService.dismissModal();
  }

}
