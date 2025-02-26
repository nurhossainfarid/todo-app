import { Component, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonGrid,
  IonCol,
  IonRow,
} from '@ionic/angular/standalone';
import { TodoService } from '../services/todo.service';
import { ITodo } from '../services/interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonButton,
    IonGrid,
    IonCol,
    IonRow,
  ],
})
export class HomePage {
  private todoService = inject(TodoService);
  public todos: ITodo[] = [];
  constructor() {
    this.fetchTodos();
  }

  fetchTodos() {
    this.todoService.getAllTodos().subscribe({
      next: (res) => {
        this.todos.push(...res);
      },
    });
  }
}
