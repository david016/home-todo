import { TodoService } from './../todo.service';
import { Component, OnInit } from '@angular/core';
import { Todo } from 'types/todo.interface';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  listOfTodos: Todo[] = [];

  constructor(private TodoService: TodoService) {}

  ngOnInit(): void {
    this.listOfTodos = this.TodoService.getTodos();
  }
}