import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCardSubtitle,
  IonCardHeader,
  IonCard,
  IonCardTitle,
  IonBackButton,
  IonButtons,
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';
import { ITodo } from 'src/app/services/interface';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [
    IonButtons,
    IonBackButton,
    IonContent,
    IonCardTitle,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonButton,
    IonCard,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
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
