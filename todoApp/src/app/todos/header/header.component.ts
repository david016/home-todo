import { TodoInterface } from './../../../../types/todo.interface';
import { TodoService } from '../services/todo.service';
import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  text: string = '';
  constructor(
    private todoService: TodoService,
    private backendService: BackendService
  ) {}

  ngOnInit(): void {}

  changeText(event: Event) {
    const target = event.target as HTMLInputElement;
    this.text = target.value;
  }

  addTodo(): void {
    let todo: TodoInterface = {
      text: this.text,
      isCompleted: false,
    };
    this.backendService.sendTodo(todo).subscribe({
      next: () => {
        console.log('Success');
      },
      error: (result) => {
        console.log('result is:', result);
      },
    });
    this.todoService.addTodo(this.text);
    this.text = '';
  }
}
