import { Component, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  private todoService = inject(TodoService);
  constructor() {
    this.fetchTodos();
  }

  fetchTodos() {
    this.todoService.getAllTodos().subscribe((todos) => {
      console.log(todos);
    });
  }
}
