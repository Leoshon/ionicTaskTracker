import { Component, OnInit, inject } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { UtilsService } from 'src/app/services/utils.service';
import {FirebaseService} from 'src/app/services/firebase.service';
import { AddUpdateTaskComponent } from 'src/app/shared/components/add-update-task/add-update-task.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  utilService=inject(UtilsService);
  fireService=inject(FirebaseService);
  tasks: Task[] = [
/*     {
      id: '1',
      title: 'Auth con Google',
      description: 'Implementar el Auth con Google',
      items: [
        {
          name: 'Crear el proyecto en Google',
          done: true
        },
        {
          name: 'Instalar Google en el proyecto',
          done: true
        },
        {
          name: 'Crear la interfaz de usuario',
          done: true
        },
        {
          name: 'Implementar la funcionalidad',
          done: false
        }
      ]
    },
    {
      id: '2',
      title: 'Auth con Facebook',
      description: 'Implementar el Auth con Facebook',
      items: [
        {
          name: 'Crear el proyecto en Facebook',
          done: true
        },
        {
          name: 'Instalar Facebook en el proyecto',
          done: true
        },
        {
          name: 'Crear la interfaz de usuario',
          done: false
        },
        {
          name: 'Implementar la funcionalidad',
          done: false
        }
      ]
    },
    {
      id: '3',
      title: 'Auth con Twitter',
      description: 'Implementar el Auth con Twitter',
      items: [
        {
          name: 'Crear el proyecto en Twitter',
          done: false
        },
        {
          name: 'Instalar Twitter en el proyecto',
          done: true
        },
        {
          name: 'Crear la interfaz de usuario',
          done: true
        },
        {
          name: 'Implementar la funcionalidad',
          done: false
        }
      ]
    } */
  ];

  constructor() { }

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
  this.fireService.getTasks(`users/${this.getUsuario().uid}/tasks`).subscribe((tasks) => {
    this.tasks = tasks;
   
  });
 
 }
}
