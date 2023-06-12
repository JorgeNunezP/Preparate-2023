import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { firebaseConfig } from './firebaseConfig';
import firebase from 'firebase/compat/app';

/*const firebaseConfig = {
  apiKey: 'AIzaSyCyfnAKl2VnJgxU3-E5TnmGlgfjSfykJYk',
  authDomain: 'preparate-b4556.firebaseapp.com',
};*/

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'preparate';
  constructor(private router: Router, public loginService: LoginService) {}

  user = {
    photo: '',
  };

  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }

  ngOnInit(): void {
    firebase.initializeApp(firebaseConfig);
    if (this.loggedIn()) {
      this.user.photo = this.loginService.getPhoto();
    }
  }

  loggedIn() {
    return this.loginService.loggedIn();
  }

  logout() {
    this.loginService.logout();
  }
}
