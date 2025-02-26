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

  // create a new todo
  createTodo(todo: ITodo): Observable<ITodo> {
    return this.http.post<ITodo>(
      `https://jsonplaceholder.typicode.com/todos`,
      todo
    );
  }

  // get all todos
  getAllTodos(): Observable<ITodo[]> {
    return this.http.get<ITodo[]>(`https://jsonplaceholder.typicode.com/todos`);
  }

  // get todo details
  getTodoDetails(id: number): Observable<ITodo> {
    return this.http.get<ITodo>(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );
  }

  // update todo
  updateTodo(todo: ITodo): Observable<ITodo> {
    return this.http.put<ITodo>(
      `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
      todo
    );
  }

  // toggle todo status
  toggleTodoStatus(todo: ITodo): Observable<ITodo> {
    todo.completed = !todo.completed;
    return this.http.put<ITodo>(
      `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
      todo
    );
  }

  // delete todo
  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );
  }
}
