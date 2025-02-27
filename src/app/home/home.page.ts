import {
  IonCol,
  IonRow,
  IonList,
  IonItem,
  IonAlert,
  IonText,
  IonCard,
  IonGrid,
  IonLabel,
  IonInput,
  IonTitle,
  IonModal,
  IonAvatar,
  IonHeader,
  IonButton,
  IonToolbar,
  IonContent,
  IonCardTitle,
  IonCardHeader,
  IonCardContent,
  IonCardSubtitle,
  IonSkeletonText,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  InfiniteScrollCustomEvent,
} from '@ionic/angular/standalone';
import { nanoid } from 'nanoid';
import { Component, inject, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TodoService } from '../services/todo.service';
import { ITodo } from '../services/interface';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonCol,
    IonRow,
    IonList,
    IonAlert,
    IonItem,
    IonCard,
    IonGrid,
    IonModal,
    IonLabel,
    IonInput,
    IonTitle,
    IonAvatar,
    IonHeader,
    IonButton,
    IonToolbar,
    IonContent,
    RouterModule,
    IonCardTitle,
    IonCardHeader,
    IonCardContent,
    IonSkeletonText,
    IonCardSubtitle,
    IonInfiniteScroll,
    ReactiveFormsModule,
    IonInfiniteScrollContent,
  ],
})
export class HomePage {
  private todoService = inject(TodoService);
  public error = null;
  public isLoading = false;
  public todoList = this.todoService.todoList;
  public todoData: ITodo | undefined;
  public dummyArray = new Array(3);

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  todoForm = new FormGroup({
    id: new FormControl(''),
    title: new FormControl(''),
    userId: new FormControl(''),
    completed: new FormControl(false),
  });

  constructor() {
    this.todoService.getAllTodos().subscribe();
    console.log(this.todoList);
  }

  // Add new todo
  addTodo() {
    if (this.todoForm.valid) {
      const newTodo = {
        id: nanoid(),
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
  getTodoDetails = (id: string) => {
    this.setOpen(true);
    this.todoService.getTodoDetails(id).subscribe({
      next: (data) => {
        this.todoData = data;
      },
      error: (err) => console.error('Error getting todo details:', err),
    });
  };

  // Delete todo
  deleteTodo = (id: string) => {
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

    this.todoService.updateTodo(updateTodoData).subscribe({
      next: (res) => {
        this.setOpen(false);
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
