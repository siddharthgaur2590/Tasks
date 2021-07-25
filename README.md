# TODO-APP

This project was generated with [Angular CLI](https://github.com/angular/angular-cli). You can use commands such as
`npm install -g angular-cli`.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Importantly, additional scripts are added into package.json for running the npm commands.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can use commands such as 
`ng new todo-app --routing`, OR `ng g c components/todo-list` OR `ng generate component components/todo-list`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Important files access
1. Initial todo list is fetched from External source url mentioned in `environment.ts` OR `environment.prod.ts`.
2. All rest apis call designed for http request is incorporated in injectable services folder, here you may access the same at `services/rest/todo-data/todoData.service`.
3. All data model interaction is maintained under model folder, here you may access the same at `src/app/model/todo-to`.
4. All company's/project related assets like images are stored under asset folder, here you may access the same at
`assets/todo-app-images/casestudy-logo.png`. This could be render from cloud as well.

## Average time to build
Average time taken to build the first version of todo-app is 1.5 days.
