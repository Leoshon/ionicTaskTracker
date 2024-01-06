import { Component, Input, OnInit, inject } from '@angular/core';
import { Item, Task } from 'src/app/models/task.model';
import { UtilsService } from 'src/app/services/utils.service';
import { User } from 'src/app/models/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemReorderEventDetail } from '@ionic/angular';

@Component({
  selector: 'app-add-update-task',
  templateUrl: './add-update-task.component.html',
  styleUrls: ['./add-update-task.component.scss'],
})
export class AddUpdateTaskComponent implements OnInit {
  utilService = inject(UtilsService);
  @Input() task?: Task;
  usuario = {} as User;
  form = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    items: new FormControl(
      [
        {
          name: '',
          done: false,
        },
      ],
      [Validators.required, Validators.minLength(1)]
    ),
  });

  constructor() {}

  ngOnInit() {
    this.usuario = this.utilService.getLocalStroage('user');
    if (this.task) {
      this.form.setValue(this.task as any);
    }
  }
  getProgress() {
    return this.utilService.getPercentage(this.form.value as Task);
  }
  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    // Before complete is called with the items they will remain in the
    // order before the drag
    console.log('Before complete', this.form.value.items);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. Update the items variable to the
    // new order of items
    this.form.value.items = ev.detail.complete(
      this.form.value.items as Task['items']
    );
  }
  removeItem(index: number) {
    //utilizo splice para eliminar el item del array
    this.form.value.items!.splice(index, 1);
    //actualizo el valor del formulario
    this.form.value.items = [...this.form.value.items!];
  }
  createItem() {
    this.utilService.showAlert({
      header: 'Nueva Actividad',
      backdropDismiss: false,
      inputs: [
        {
          name: 'name',
          type: 'textarea',
          placeholder: 'Qué necesitas hacer?',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Crear',
          handler: (data) => {
            //utilizo unshift para agregar el item al inicio del array
            this.form.value.items!.unshift({
              name: data.name,
              done: false,
            });
            //actualizo el valor del formulario
            this.form.value.items = [...this.form.value.items!];
          },
        },
      ],
    });
    
  }

}
