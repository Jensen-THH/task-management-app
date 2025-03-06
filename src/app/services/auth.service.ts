import { DestroyRef, EnvironmentInjector, inject, Injectable, runInInjectionContext } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from '@angular/fire/auth';
import { Observable, catchError, from, map, throwError } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private injector: EnvironmentInjector) { }
  destroyRef = inject(DestroyRef);
  login(email: string, password: string): Observable<User> {
    return runInInjectionContext(this.injector, () => {
      const auth = inject(Auth);
      return from(signInWithEmailAndPassword(auth, email, password)).pipe(
        map(userCredential => userCredential.user),
        catchError(error => {
          return throwError(() => error);
        }),
        takeUntilDestroyed(this.destroyRef)
      );
    });
  }

  register(email: string, password: string): Observable<User> {
    return runInInjectionContext(this.injector, () => {
      const auth = inject(Auth);
      return from(createUserWithEmailAndPassword(auth, email, password)).pipe(
        map(userCredential => userCredential.user),
        catchError(error => {
          console.error('Registration failed:', error);
          return throwError(() => error);
        }),
        takeUntilDestroyed(this.destroyRef)
      );
    });
  }

  getCurrentUser(): User | null {
    const auth = inject(Auth);
    return auth.currentUser;
  }
}