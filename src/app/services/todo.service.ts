import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ITodo } from './interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient);
  private todoListSignal = signal<ITodo[]>([]);
  todoUrl: string = 'https://jsonplaceholder.typicode.com/todos';

  constructor() {}

  get todoList() {
    return this.todoListSignal;
  }

  // create a new todo
  createTodo(todo: ITodo): Observable<ITodo> {
    return this.http.post<ITodo>(`${this.todoUrl}`, todo).pipe(
      tap((newTodo) => {
        this.todoListSignal.update((todos) => [...todos, newTodo]);
      })
    );
  }

  // get all todos
  getAllTodos(): Observable<ITodo[]> {
    return this.http
      .get<ITodo[]>(`${this.todoUrl}`)
      .pipe(tap((todos) => this.todoListSignal.set(todos)));
  }

  // get todo details
  getTodoDetails(id: number): Observable<ITodo> {
    return this.http.get<ITodo>(`${this.todoUrl}/${id}`);
  }

  // update todo
  updateTodo(todo: ITodo): Observable<ITodo> {
    return this.http.put<ITodo>(`${this.todoUrl}/${todo.id}`, todo);
  }

  // toggle todo status
  toggleTodoStatus(todo: ITodo): Observable<ITodo> {
    todo.completed = !todo.completed;
    return this.http.put<ITodo>(`${this.todoUrl}/${todo.id}`, todo);
  }

  // delete todo
  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.todoUrl}/${id}`);
  }
}
