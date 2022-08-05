import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { FilterEnum } from 'types/filter.enum';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  activeCount$: Observable<number>;
  noTodoClass$: Observable<boolean>;
  itemsLeftText$: Observable<string>;
  filter$: Observable<FilterEnum>;
  filterEnum = FilterEnum;

  constructor(private todoService: TodoService) {
    this.activeCount$ = this.todoService.todos$.pipe(
      map((todos) => todos.filter((todo) => !todo.isCompleted).length)
    );

    this.itemsLeftText$ = this.activeCount$.pipe(
      map((activeCount) => `item${activeCount !== 1 ? 's' : ''} left`)
    );

    this.noTodoClass$ = this.todoService.todos$.pipe(
      map((todos) => todos.length === 0)
    );

    this.filter$ = this.todoService.filter$;
  }

  ngOnInit(): void {}

  changeFilter(event: Event, filter: FilterEnum) {
    event.preventDefault();
    this.todoService.changeFilter(filter);
  }
}
