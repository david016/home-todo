import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { TodoInterface } from 'types/todo.interface';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit, OnChanges {
  @Input('todo') todoProps!: TodoInterface;
  @Input('isEditing') isEditingProps: boolean = false;
  @Output('setEditingId') setEditingIdEvent: EventEmitter<string | null> =
    new EventEmitter();

  @ViewChild('textInput') textInput?: ElementRef;

  editingText: string = '';

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.editingText = this.todoProps.text;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
    setTimeout(() => {
      if (changes.isEditingProps.currentValue) {
        this.textInput?.nativeElement.focus();
      }
    }, 0);
  }

  setTodoInEditMode(): void {
    this.setEditingIdEvent.emit(this.todoProps.id!);
  }

  removeTodo(): void {
    this.todoService.removeTodo(this.todoProps.id!);
  }

  toggleTodo(): void {
    this.todoService.toggleTodo(this.todoProps.id!);
    console.log('toggletodo');
  }

  changeText(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.editingText = value;
  }

  changeTodo(): void {
    this.setEditingIdEvent.emit(null);
    this.todoService.changeTodo(this.todoProps.id!, this.editingText);
  }
}
