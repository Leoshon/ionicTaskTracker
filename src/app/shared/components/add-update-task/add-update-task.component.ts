import { Component, Input, OnInit, inject } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { UtilsService } from 'src/app/services/utils.service';
import { User } from 'src/app/models/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-update-task',
  templateUrl: './add-update-task.component.html',
  styleUrls: ['./add-update-task.component.scss'],
})
export class AddUpdateTaskComponent  implements OnInit {
  utilService=inject(UtilsService);
  @Input() task?: Task;
  usuario={} as User;
  form = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    items: new FormControl([], [Validators.required, Validators.minLength(1)]),
  });

  constructor() { }

  ngOnInit() {
   this.usuario=this.utilService.getLocalStroage('user');
   if(this.task){
     this.form.setValue(this.task as any);
   }
  }

}
