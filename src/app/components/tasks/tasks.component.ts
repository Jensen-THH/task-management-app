import { CommonModule } from '@angular/common';
import { Component } from '@angular/core'; 
import { Observable } from 'rxjs';
import { TaskService } from './task.service';
import { FormsModule } from '@angular/forms';

export interface Task {
  taskId?: string;
  title: string;
  createdAt: Date;
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
}