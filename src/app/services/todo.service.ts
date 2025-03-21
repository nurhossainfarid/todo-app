import { ITodo } from './interface';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

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
  getTodoDetails(id: string): Observable<ITodo> {
    return this.http
      .get<ITodo>(`${this.todoUrl}/${id}`)
      .pipe(
        tap((todo) =>
          this.todoListSignal.update((todos) =>
            todos.map((t) => (t.id === id ? todo : t))
          )
        )
      );
  }

  // update todo
  updateTodo(todo: ITodo): Observable<ITodo> {
    return this.http.put<ITodo>(`${this.todoUrl}/${todo.id}`, todo).pipe(
      tap((updatedMovie) => {
        this.todoListSignal.update((todos) =>
          todos.map((todo) =>
            todo.id === updatedMovie.id ? updatedMovie : todo
          )
        );
      })
    );
  }

  // toggle todo status
  toggleTodoStatus(todo: ITodo): Observable<ITodo> {
    todo.completed = !todo.completed;
    return this.http.put<ITodo>(`${this.todoUrl}/${todo.id}`, todo);
  }

  // delete todo
  deleteTodo(id: string): Observable<void> {
    return this.http.delete<void>(`${this.todoUrl}/${id}`).pipe(
      tap(() => {
        this.todoListSignal.update((todos) =>
          todos.filter((todo) => todo.id !== id)
        );
      })
    );
  }
}
