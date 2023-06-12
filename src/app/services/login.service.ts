import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private router: Router, private cookies: CookieService) {}

  token: string | undefined;

  login(email: string, password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((response) => {
          localStorage.setItem('user', JSON.stringify(response.user));
          firebase
            .auth()
            .currentUser?.getIdToken()
            .then((token) => {
              this.token = token;
              this.cookies.set('token', this.token);
              resolve('loggedIn');
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  loggedIn() {
    return this.cookies.get('token');
  }

  getIdToken() {
    return this.cookies.get('token');
  }

  logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.token = '';
        this.cookies.set('token', this.token);
        localStorage.setItem('user', 'null');
        this.router.navigate(['']);
      });
  }

  getId() {
    return JSON.parse(localStorage.getItem('user')!).uid;
  }

  getName() {
    return JSON.parse(localStorage.getItem('user')!).displayName;
  }

  getEmail() {
    return JSON.parse(localStorage.getItem('user')!).email;
  }

  getPhoto() {
    return JSON.parse(localStorage.getItem('user')!).photoURL;
  }
}
