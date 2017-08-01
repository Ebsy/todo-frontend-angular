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

    constructor(private userService: UserService, private todoService: TodoService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    }

    addTodo() {
		if (this.newTodoText.trim().length) {
			this.todoService.update(this.newTodoText);
			this.newTodoText = '';
		}
	}

    private loadAllUsers() {
        this.todoService.getAll().subscribe(todos => { this.todos = todos; });
    }
}
