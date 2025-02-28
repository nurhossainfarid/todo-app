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
import { Component, inject, Input } from '@angular/core';
import { ITodo } from 'src/app/services/interface';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
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
    TodoCardComponent,
    IonInfiniteScroll,
    ReactiveFormsModule,
    IonInfiniteScrollContent,
  ],
})
export class TodoCardComponent {
  @Input() todo!: ITodo;
  private todoService = inject(TodoService);
  public error = null;
  public isLoading = false;
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

  constructor() {}

  // get single todo
  getTodoDetails = (id: string) => {
    this.setOpen(true);
    this.todoService.getTodoDetails(id).subscribe({
      next: (data) => {
        this.todo = data;
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
      id: this.todo?.id,
      title: !this.todoForm.value.title
        ? this.todo?.title
        : this.todoForm.value.title,
      userId: !this.todoForm.value.userId
        ? this.todo?.userId
        : this.todoForm.value.userId,
      completed: !this.todoForm.value.completed
        ? this.todo?.completed
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
}
