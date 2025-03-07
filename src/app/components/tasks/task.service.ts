import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Task } from './tasks.component';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private firestore: Firestore) {}

  getTasks(): Observable<Task[]> {
    return new Observable((observer) => {
      const taskCollection = collection(this.firestore, 'tasks');
      const unsubscribe = onSnapshot(taskCollection, (snapshot) => {
        const tasks = snapshot.docs.map(doc => {
          const data = doc.data();
          // Chuyển Timestamp thành Date
          if (data['createdAt'] && 'seconds' in data['createdAt']) {
            data['createdAt'] = new Date(data['createdAt'].seconds * 1000 + data['createdAt'].nanoseconds / 1000000);
          }
          if (data['timeUpdate'] && 'seconds' in data['timeUpdate']) {
            data['timeUpdate'] = new Date(data['timeUpdate'].seconds * 1000 + data['timeUpdate'].nanoseconds / 1000000);
          }
          return { id: doc.id, ...data } as Task;
        });
        observer.next(tasks);
      }, (error) => {
        observer.error(error);
      });
      return () => unsubscribe();
    });
  }

  // Thêm task mới
  addTask(task: Task) {
    const taskCollection = collection(this.firestore, 'tasks');
    return addDoc(taskCollection, task);
  }

  // Xóa task
  deleteTask(id: string) {
    const taskDoc = doc(this.firestore, 'tasks', id);
    return deleteDoc(taskDoc);
  }

  // Update task
  updateTask(id: string, task: Partial<Task>) {
    const taskDoc = doc(this.firestore, 'tasks', id);
    return updateDoc(taskDoc, task);
  }
}