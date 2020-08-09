import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Task } from './task.model';

@Injectable()
export class TaskService {
  selectedTask: Task;
  tasks: Task[];
  readonly baseURL = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) { }

  postTask(tsk: Task) {
    return this.http.post(this.baseURL, tsk);
  }

  getTaskList() {
    return this.http.get(this.baseURL);
  }

  putTask(tsk: Task) {
    return this.http.put(this.baseURL + `/${tsk._id}`, tsk);
  }

  deleteTask(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

}
