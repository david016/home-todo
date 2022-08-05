import { BackendService } from './../services/backend.service';
import { TodoService } from '../services/todo.service';
import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { TodoInterface } from 'types/todo.interface';
import { FilterEnum } from 'types/filter.enum';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  visibleTodos$: Observable<TodoInterface[]>;
  noTodoClass$: Observable<boolean>;
  isAllTodosSelected$: Observable<boolean>;
  editingId: string | null = null;
  backendTodos: Observable<TodoInterface[]>;

  constructor(
    private todoService: TodoService,
    private backendService: BackendService
  ) {
    this.backendTodos = this.backendService.getTodos();

    this.isAllTodosSelected$ = this.backendTodos.pipe(
      map((todos) => todos.every((todo) => todo.isCompleted))
    );
    this.noTodoClass$ = this.backendTodos.pipe(
      map((todos) => todos.length === 0)
    );
    this.visibleTodos$ = combineLatest([
      this.backendTodos,
      this.todoService.filter$,
    ]).pipe(
      map(([todos, filter]: [TodoInterface[], FilterEnum]) => {
        if (filter === FilterEnum.active) {
          return todos.filter((todo) => !todo.isCompleted);
        } else if (filter === FilterEnum.completed) {
          return todos.filter((todo) => todo.isCompleted);
        }
        return todos;
      })
    );
  }
  // constructor(
  //   private todoService: TodoService,
  //   private backendService: BackendService
  // ) {
  //   this.isAllTodosSelected$ = this.todoService.todos$.pipe(
  //     map((todos) => todos.every((todo) => todo.isCompleted))
  //   );
  //   this.noTodoClass$ = this.todoService.todos$.pipe(
  //     map((todos) => todos.length === 0)
  //   );
  //   this.visibleTodos$ = combineLatest([
  //     this.todoService.todos$,
  //     this.todoService.filter$,
  //   ]).pipe(
  //     map(([todos, filter]: [TodoInterface[], FilterEnum]) => {
  //       if (filter === FilterEnum.active) {
  //         return todos.filter((todo) => !todo.isCompleted);
  //       } else if (filter === FilterEnum.completed) {
  //         return todos.filter((todo) => todo.isCompleted);
  //       }
  //       return todos;
  //     })
  //   );
  // }

  ngOnInit(): void {}

  toggleAllTodos(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.todoService.toggleAll(target.checked);
  }

  setEditingId(editingId: string | null): void {
    this.editingId = editingId;
  }
}
