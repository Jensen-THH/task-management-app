import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth) { }

  register(email: string, password: string): Observable<User> {
    return from(createUserWithEmailAndPassword(this.auth, email, password)
      .then(userCredential => {
        console.log('Registered user:', userCredential.user)
        return userCredential.user
      }));
  }
  login(email: string, password: string): Observable<User> {
    return from(signInWithEmailAndPassword(this.auth, email, password)
      .then(userCredential => userCredential.user));
  }

  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }
}