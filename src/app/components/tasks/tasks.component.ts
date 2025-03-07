import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskService } from './task.service';
import { FormsModule } from '@angular/forms';

export interface Task {
  id?: any;
  title: string;
  createdAt: Date;
  timeUpdate?: Date;
  description?: string;
}

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {
  tasks$?: Observable<Task[]>;
  newTask: Task = {
    title: 'new task',
    createdAt: new Date()
  };
  isEdit = false;
  editTaskValue = {} as Task;

  constructor(private taskService: TaskService) {
    this.tasks$ = this.taskService.getTasks();
  }

  addTask() {
    this.newTask.createdAt = new Date();
    this.taskService.addTask(this.newTask).then(() => {
    }).catch((error) => {
      console.error('Error adding task:', error);
    });
  }

  deleteTask(id: string) {
    if (!confirm('Are you sure you want to delete this task?')) {
      return;
    }

    this.taskService.deleteTask(id).then(() => {
    }).catch((error) => {
      console.error('Error deleting task:', error);
    });
  }

  editTask(task: Task) {
    this.isEdit = true;
    this.editTaskValue = { ...task };
  }

  cancelEditTask() {
    this.isEdit = false;
    this.editTaskValue = {} as Task;
  }

  saveEditTask(task: Task) {
    task.timeUpdate = new Date();
    this.taskService.updateTask(task.id, task).then(() => {
      this.isEdit = false;
      this.editTaskValue = {} as Task;
    }).catch((error) => {
      console.error('Error updating task:', error);
    });
  }
}