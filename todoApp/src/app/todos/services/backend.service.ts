import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TodoInterface } from 'types/todo.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private url: string = environment.API_URL;

  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //   }),
  // };

  constructor(private http: HttpClient) {}

  sendTodo(todo: TodoInterface): Observable<TodoInterface> {
    return this.http.post<TodoInterface>(`${this.url}/addTodo`, todo);
  }

  getTodos(): Observable<TodoInterface[]> {
    return this.http.get<TodoInterface[]>(`${this.url}/todos`);
  }
}
