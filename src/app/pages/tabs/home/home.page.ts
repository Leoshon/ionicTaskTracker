import { Component, OnInit, inject } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { UtilsService } from 'src/app/services/utils.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AddUpdateTaskComponent } from 'src/app/shared/components/add-update-task/add-update-task.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  utilService = inject(UtilsService);
  fireService = inject(FirebaseService);
  tasks: Task[] = [];

  constructor() {}

  ngOnInit() {
    // this.getTasks();
  }
  ionViewWillEnter() {
    this.getTasks();
  }
  getUsuario() {
    let usuario = this.utilService.getLocalStroage('user');
    return usuario;
  }
  getPercentage(task: Task) {
    return this.utilService.getPercentage(task);
  }
  addUpdateTask(task?: Task) {
    this.utilService.presentModal({
      component: AddUpdateTaskComponent,
      componentProps: { task },
      cssClass: 'add-update-task-modal',
      backdropDismiss: false,
    });
  }
  getTasks() {
    this.fireService
      .getTasks(`users/${this.getUsuario().uid}/tasks`)
      .subscribe((tasks) => {
        this.tasks = tasks;
      });
  }
  deleteTask(id: any) {
    this.fireService.deleteDocument(`users/${this.getUsuario().uid}/tasks`, id);
    this.getTasks();
  }
  async presentAlertConfirm(id: any) {
    this.utilService.presentLoading({ message: 'Please wait...' });

    const alert = await this.utilService.showAlert({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: '',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
         
        }, {
          text: 'Borrar tarea',
          handler:  () => {
            this.deleteTask(id);
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await this.utilService.dismissLoading();
  
  }

}
