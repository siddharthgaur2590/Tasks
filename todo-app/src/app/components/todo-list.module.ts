import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListRoutingModule } from './todo-list/todo-list-routing.module';
import { TodoListComponent } from './todo-list/todo-list.component';
import { HttpClientModule } from '@angular/common/http';
import { TodoDataService } from '../services/rest/todo-data/todoData.service';

@NgModule({
  imports: [
    CommonModule,
    TodoListRoutingModule,
    HttpClientModule
  ],
  declarations: [TodoListComponent],
  providers: [
    TodoDataService
  ]
})
export class TodoListModule { }