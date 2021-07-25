import { Component, OnInit } from '@angular/core';
import { TodoTO } from 'src/app/model/todo-to';
import { TodoDataService } from '../../services/rest/todo-data/todoData.service'
import * as _ from 'lodash';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  /** List contains all set of todo data. */
  todoList: TodoTO[] = [];

  /** List contains all set of filtered todo data. */
  filteredTodoList: TodoTO[] = [];

  /** Binding element with input given. */
  todoToAdd: TodoTO = new TodoTO();

  /** Max id of element present in todoList\. */
  maxId: number;

  /** Text to display on screen. */
  countResultText: string = 'in total';

  /**
   * Create the component
   *
   * @param todoDataService service to access operational end-points.
   */
  constructor(private todoDataService: TodoDataService) {
  }

  /**
   * On load execution. Data needed to restore on component load.
   */
  ngOnInit(): void {
    this.loadTodoData();
  }

  /**
   * Method to load the initial set of todo items from external source.
   * The display of items is limited to count 10.
   */
  loadTodoData(): void {
    this.todoDataService.getAllTodos().subscribe((response) => {
      this.todoList = response.slice(0, 10);
      this.cloneToMasterList();
    });
  }

  /**
   * Method to clone the master set of list to filtered list for different show ups.
   *
   * @returns clone list from master list.
   */
  cloneToMasterList() {
    return this.filteredTodoList = _.cloneDeep(this.todoList);
  }

  /**
   * Method to add new todo item in existing todoList.
   */
  addTodoItem(): void {
    if (this.todoList.length > 0) {
      this.maxId = this.todoList.reduce((a, b) => (b.id > a ? b.id : a), this.todoList[0].id);
    } else {
      this.maxId = 0;
    }
    this.todoToAdd.id = ++this.maxId;
    this.todoList.push(this.todoToAdd);
    this.cloneToMasterList();
    this.resultDisplayText('in total');
    this.todoToAdd = new TodoTO();
  }

  /**
   * Method to mark the item of list as complete or not.
   *
   * @param todo item for which complete checkbox is toggled.
   * @returns update TO model once toggle is made.
   */
  toggleTodoComplete(todo: TodoTO) {
    let updatedTodo = this.todoDataService.updateTodoItemById(this.todoList, todo.id, {
      completed: !todo.completed
    });
    this.todoList.forEach((item) => {
      if (item.id === updatedTodo.id) {
        item = updatedTodo;
      }
    });
    this.cloneToMasterList();
  }

  /**
   * Method to set the editable flag to show/hide input box.
   *
   * @param todo item for which edit needs to be done.
   */
  editableTodo(todo: TodoTO): void {
    todo.isEditable = true;
  }

  /**
   * Method to update the changed todo item from list.
   *
   * @param todo item for which edit needs to be done.
   * @param updateTitle the updated title to modify in list.
   */
  updateChangedTodoItem(todo: TodoTO, updateTitle: string): void {
    updateTitle = updateTitle.trim();
    todo.isEditable = false;

    if (updateTitle.length === 0) {
      this.deleteTodoItemById(todo.id);
    }
    todo.title = updateTitle;
    this.filteredTodoList.forEach((element) => {
      if (element.id === todo.id) {
        element = todo;
      }
    });
    this.todoList = this.filteredTodoList;
  }

  /**
   * Method to delete the item from list based on Id.
   *
   * @param id item id to delete from the todoList.
   */
  deleteTodoItemById(id: number): void {
    this.cloneToMasterList();
    this.filteredTodoList = this.filteredTodoList
      .filter(todo => todo.id !== id);
    this.todoList = this.filteredTodoList;
    this.resultDisplayText('in total');
  }

  /**
   * Method to set hide the editable mode of list item.
   *
   * @param todo item for which edit needs to be done.
   */
  cancelEditingTodoItem(todo: TodoTO): void {
    todo.isEditable = false;
  }

  /**
   * Method to filter the list based on applied trigger event.
   *
   * @param filterToApply filtering attribute.
   * @returns list of filtered items.
   */
  filterTodoList(filterToApply: string) {
    this.cloneToMasterList();
    if (filterToApply === 'active') {
      this.resultDisplayText('active');
      return this.filteredTodoList = this.filteredTodoList
        .filter(todo => todo.completed !== true);
    } else if (filterToApply === 'completed') {
      this.resultDisplayText('completed');
      return this.filteredTodoList = this.filteredTodoList
        .filter(todo => todo.completed === true);
    } else {
      this.resultDisplayText('in total');
      return this.filterTodoList;
    }
  }

  /**
   * Method to delete all completed items from todo list.
   */
  deleteAllCompletedTodoItems(): void {
    this.cloneToMasterList();
    this.filteredTodoList = this.filteredTodoList
      .filter(todo => todo.completed !== true);
    this.todoList = this.filteredTodoList;
  }

  /**
   * Method to customize the display text for result.
   *
   * @param displayText text to show on screen.
   */
  resultDisplayText(displayText: string): void {
    this.countResultText = displayText;
  }
}
