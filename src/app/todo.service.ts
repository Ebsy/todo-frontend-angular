import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Todo } from './todo.model';

@Injectable()
export class TodoService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get('http://localhost:4040/api/todos', this.jwt()).map((response: Response) => response.json());
    }

    update(todo: string) {
        return this.http.patch('/api/todos/', todo, this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods
    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
