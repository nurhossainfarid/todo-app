import {
  IonCard,
  IonTitle,
  IonHeader,
  IonContent,
  IonToolbar,
  IonButtons,
  IonCardTitle,
  IonCardHeader,
  IonBackButton,
  IonCardSubtitle,
} from '@ionic/angular/standalone';
import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';
import { ITodo } from 'src/app/services/interface';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [
    IonCard,
    IonCard,
    IonTitle,
    IonHeader,
    IonButtons,
    IonContent,
    IonToolbar,
    FormsModule,
    IonCardTitle,
    CommonModule,
    IonBackButton,
    IonCardHeader,
    IonCardSubtitle,
  ],
})
export class DetailsPage {
  route: ActivatedRoute = inject(ActivatedRoute);
  private todoService = inject(TodoService);
  public todoData: ITodo | undefined;

  constructor() {
    const id = this.route.snapshot.params['id'];
    this.todoService.getTodoDetails(id).subscribe({
      next: (data) => {
        this.todoData = data;
      },
      error: (err) => console.error('Error getting todo details:', err),
    });
  }
}
