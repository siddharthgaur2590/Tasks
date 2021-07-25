/**
* The todo TO class.
*/
export class TodoTO {

    /** Todo assigned to user Id */
    userId: number = 2;

    /** Technical id of the todo item */
    id: number = 0;

    /** Description of todo item */
    title: string = '';

    /** Completion state of the todo item */
    completed: boolean = false;

    /** Flag indicating todo item editable or not */
    isEditable: boolean = false;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
