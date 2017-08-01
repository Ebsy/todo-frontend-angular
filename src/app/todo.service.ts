import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Todo } from './todo.model';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()
export class TodoService {
  constructor(private http: Http) { }

  getAll() {
    return this.http
      .get('http://localhost:4040/api/todos', this.jwt())
      .map((response) => {
        const todos = response.json();
        return todos.map((todo) => new Todo(todo));
        // response.json()
      })
      .catch(this.handleError);
  }

  update(todo: Todo): Observable<Todo> {
    const todo2 = { todo: todo };
    return this.http
      .patch('http://localhost:4040/api/todos', todo2, this.jwt())
      .map(response => {
        const todos = response.json();
        return todos.map((todo) => new Todo(todo));
      })
      .catch(this.handleError);

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

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
}
