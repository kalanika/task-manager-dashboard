import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TaskService } from '../shared/task.service';
import { Task } from '../shared/task.model';

declare var M: any;

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  providers: [TaskService]
})
export class TaskComponent implements OnInit {

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshTaskList();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.taskService.selectedTask = {
      _id: "",
      name: "",
      duedate:null,
      description: ""
    }
  }

  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.taskService.postTask(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshTaskList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else {
      this.taskService.putTask(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshTaskList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }

  refreshTaskList() {
    this.taskService.getTaskList().subscribe((res) => {
      this.taskService.tasks = res as Task[];
    });
  }

  onEdit(tsk: Task) {
    this.taskService.selectedTask = tsk;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.taskService.deleteTask(_id).subscribe((res) => {
        this.refreshTaskList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }

 private loadComponent=false;
    loadMyChildComponent(){
     this. loadComponent = true;
    }

}
