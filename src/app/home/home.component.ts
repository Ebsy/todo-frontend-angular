import { Component, OnInit } from '@angular/core';

import { User } from '../user.model';
import { UserService } from '../user.service';

import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';

@Component({
  moduleId: module.id,
  templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
  currentUser: User;
  todos: Todo[] = [];
  newTodoText = '';

  constructor(private todoService: TodoService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  // deleteUser(id: number) {
  //   this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
  // }

  addTodo() {
    if (this.newTodoText.trim().length) {
      // const todo = new Todo(this.newTodoText);
      console.log(this.newTodoText);
      let todo = new Todo({ title: this.newTodoText })

      console.log('updating todo....')
      this.todoService.update(todo)
        .subscribe(
        (todos) => {
          console.log(todos)
          this.loadAllUsers();
          // this.todos = todos;
        }
        );
      this.newTodoText = '';
      // this.loadAllUsers();
    }
  }

  private loadAllUsers() {
    this.todoService.getAll().subscribe(todos => { this.todos = todos; });
  }
}
