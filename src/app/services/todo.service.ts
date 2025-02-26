import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITodo } from './interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient);

  constructor() {}

  getAllTodos(): Observable<ITodo[]> {
    return this.http.get<ITodo[]>(`https://jsonplaceholder.typicode.com/todos`);
  }

  getTodoDetails(id: number): Observable<ITodo> {
    return this.http.get<ITodo>(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );
  }
}
