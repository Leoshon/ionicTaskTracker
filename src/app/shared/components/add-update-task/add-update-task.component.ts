import { Component, Input, OnInit, inject } from '@angular/core';
import { Item, Task } from 'src/app/models/task.model';
import { UtilsService } from 'src/app/services/utils.service';
import { User } from 'src/app/models/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemReorderEventDetail } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-add-update-task',
  templateUrl: './add-update-task.component.html',
  styleUrls: ['./add-update-task.component.scss'],
})
export class AddUpdateTaskComponent implements OnInit {
  utilService = inject(UtilsService);
  fireStore = inject(FirebaseService);

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
      console.log(this.task)
    }
  }

  getProgress() {
    return this.utilService.getPercentage(this.form.value as Task);
  }
  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
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
  onSubmit() {
    
    if (this.task) {
      this.updateTask();
    } else {
      this.createTask();
    }
  }
  async createTask() {
    try {
      const loading = await this.utilService.presentLoading({
        message: 'Creando tarea...',
      });
      delete this.form.value.id;

      await this.fireStore.addDocument(`users/${this.usuario.uid}/tasks`, {
        ...this.form.value,
       
      });
      await this.utilService.dismissLoading();
      this.utilService.presentToast({
        message: 'Tarea creada',
        icon: 'checkmark-circle-outline',
        color: 'success',
        duration: 2000,
      });
      this.utilService.dismissModal({ success: true });
    } catch (error: any) {
      console.log(error);
      this.utilService.dismissLoading();
      this.utilService.presentToast({
        message: error.message,
        duration: 2000,
        icon: 'alert-circle-outline',
        color: 'warning',
      });
    }
  }
 async updateTask() {
  
    console.log(this.form.value);
    console.log(this.usuario.uid);
    let path = `users/${this.usuario.uid}/tasks/${this.form.value.id}`;
    const loading = await this.utilService.presentLoading({
      message: 'Actualizando tarea...',
    });
    await this.fireStore.updateDocument(path, this.form.value);
    await this.utilService.dismissLoading();
    this.utilService.presentToast({
      message: 'Tarea actualizada',
      icon: 'checkmark-circle-outline',
      color: 'success',
      duration: 2000,
    });
    this.utilService.dismissModal({ success: true });

    
  /*  await this.fireStore.updateDocument(
      `users/${this.usuario.uid}/tasks/${this.form.value.id}`,
      this.form.value
    ).then(()=>{
      this.utilService.presentToast({
        message: 'Tarea actualizada',
        icon: 'checkmark-circle-outline',
        color: 'success',
        duration: 2000,
      });
      this.utilService.dismissModal({ success: true });
      this.utilService.dismissLoading();
    })
    .catch((error)=>{
      console.log(error);
      this.utilService.dismissLoading();
      this.utilService.presentToast({
        message: error.message,
        duration: 2000,
        icon: 'alert-circle-outline',
        color: 'warning',
      });
    }); */
    
  }
}
