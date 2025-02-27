import { Component, inject } from '@angular/core';
import {
  IonList,
  IonLabel,
  IonToggle,
  IonItem,
  IonText,
  IonInput,
  IonCol,
  IonRow,
  IonCard,
  IonGrid,
  IonTitle,
  IonHeader,
  IonButton,
  IonToolbar,
  IonCardContent,
  IonContent,
  IonCardTitle,
  IonCardHeader,
  IonCardSubtitle,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  InfiniteScrollCustomEvent,
} from '@ionic/angular/standalone';
import { TodoService } from '../services/todo.service';
import { ITodo } from '../services/interface';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { ShowTodoComponent } from '../components/show-todo/show-todo.component';
import { AddTodoComponent } from '../components/add-todo/add-todo.component';
import { catchError, finalize } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonList,
    IonItem,
    IonLabel,
    IonToggle,
    IonText,
    IonInput,
    IonCol,
    IonRow,
    IonCard,
    IonCardContent,
    IonGrid,
    IonTitle,
    IonHeader,
    IonButton,
    IonToolbar,
    IonContent,
    IonCardTitle,
    IonCardHeader,
    IonCardSubtitle,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    ReactiveFormsModule,
  ],
})
export class HomePage {
  private todoService = inject(TodoService);
  public error = null;
  public isLoading = false;
  public todoList = this.todoService.todoList;

  addTodoForm = new FormGroup({
    id: new FormControl(''),
    title: new FormControl(''),
    userId: new FormControl(''),
    completed: new FormControl(false),
  });

  constructor() {
    this.todoService.getAllTodos().subscribe();
  }

  addTodo() {
    if (this.addTodoForm.valid) {
      const newTodo = {
        id: Number(this.addTodoForm.value.id),
        title: this.addTodoForm.value.title as string,
        userId: Number(this.addTodoForm.value.userId),
        completed: this.addTodoForm.value.completed as boolean,
      } as ITodo;

      this.todoService.createTodo(newTodo).subscribe({
        next: () => {
          this.addTodoForm.reset();
        },
        error: (err) => {
          console.error('Error creating movie:', err);
        },
      });
    }
  }

  deleteTodo = (id: number) => {
    this.todoService.deleteTodo(id).subscribe();
  };

  loadMore(event: InfiniteScrollCustomEvent) {
    this.todoList();
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }
}
