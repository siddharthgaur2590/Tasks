import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TodoTO } from "src/app/model/todo-to";
import { environment } from "src/environments/environment";

/**
 * Service for todo data operations.
 */
@Injectable()
export class TodoDataService {

    constructor(private http: HttpClient) {
    }

    /**
     * Get all the todo items from source url specified.
     *
     * @returns list of todo items from external url
     */
    public getAllTodos(): Observable<TodoTO[]> {
        return this.http.get<TodoTO[]>(environment.todoSourceUrl);
    }

    /**
     * Method to update the Checked/Unchecked value in existing todo item.
     *
     * @param todoList 
     * @param id 
     * @param values 
     * @returns 
     */
    public updateTodoItemById(todoList: TodoTO[], id: number, values: Object = {}): TodoTO {
        let todo = this.getTodoItemById(id, todoList);
        if (!todo) {
            return null;
        }
        Object.assign(todo, values);
        return todo;
    }

    /**
     * Get todo item based on id.
     *
     * @param id 
     * @param todoList 
     * @returns 
     */
    private getTodoItemById(id: number, todoList: TodoTO[]): TodoTO {
        return todoList
            .filter(todo => todo.id === id)
            .pop();
    }
}
