import { Component, inject, ViewChild } from '@angular/core';
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
  IonButtons,
  IonToolbar,
  IonCardContent,
  IonContent,
  IonCardTitle,
  IonCardHeader,
  IonCardSubtitle,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  InfiniteScrollCustomEvent,
  IonModal,
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { TodoService } from '../services/todo.service';
import { ITodo } from '../services/interface';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { ShowTodoComponent } from '../components/show-todo/show-todo.component';
import { AddTodoComponent } from '../components/add-todo/add-todo.component';
import { catchError, finalize } from 'rxjs';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonList,
    IonModal,
    IonItem,
    IonButtons,
    IonLabel,
    IonToggle,
    IonText,
    IonInput,
    IonCol,
    IonRow,
    IonCard,
    RouterModule,
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
  public todoData: ITodo | undefined;

  @ViewChild(IonModal) modal!: IonModal;

  cancel() {
    if (this.modal) {
      this.modal.dismiss(null, 'cancel');
    }
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {}

  todoForm = new FormGroup({
    id: new FormControl(''),
    title: new FormControl(''),
    userId: new FormControl(''),
    completed: new FormControl(false),
  });

  constructor() {
    this.todoService.getAllTodos().subscribe();
  }

  // Add new todo
  addTodo() {
    if (this.todoForm.valid) {
      const newTodo = {
        id: Number(this.todoForm.value.id),
        title: this.todoForm.value.title as string,
        userId: Number(this.todoForm.value.userId),
        completed: this.todoForm.value.completed as boolean,
      } as ITodo;

      this.todoService.createTodo(newTodo).subscribe({
        next: () => {
          this.todoForm.reset();
        },
        error: (err) => {
          console.error('Error creating movie:', err);
        },
      });
    }
  }

  // get single todo
  getTodoDetails = (id: number) => {
    this.todoService.getTodoDetails(id).subscribe({
      next: (data) => {
        this.todoData = data;
      },
      error: (err) => console.error('Error getting todo details:', err),
    });
  };

  // Delete todo
  deleteTodo = (id: number) => {
    this.todoService.deleteTodo(id).subscribe();
  };

  // Update todo
  updateTodo = () => {
    const updateTodoData = {
      id: this.todoData?.id,
      title: !this.todoForm.value.title
        ? this.todoData?.title
        : this.todoForm.value.title,
      userId: !this.todoForm.value.userId
        ? this.todoData?.userId
        : this.todoForm.value.userId,
      completed: !this.todoForm.value.completed
        ? this.todoData?.completed
        : this.todoForm.value.completed,
    } as ITodo;
    console.log(updateTodoData);
    this.todoService.updateTodo(updateTodoData).subscribe({
      next: (res) => {
        this.modal.dismiss(null, 'close');
      },
      error: (err) => {
        console.error('Error updating todo:', err);
      },
    });
  };

  loadMore(event: InfiniteScrollCustomEvent) {
    this.todoList();
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }
}
