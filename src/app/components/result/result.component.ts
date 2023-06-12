import { Component } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent {
  constructor() {}

  ngOnInit(): void {}
  subject = this.getSubject();
  result: number = this.getResult();

  getSubject() {
    let subject = localStorage.getItem('subject');

    switch (subject) {
      case 'spanish':
        localStorage.removeItem('subject');
        return 'Español';
      case 'history':
        localStorage.removeItem('subject');
        return 'Historia';
      case 'science':
        localStorage.removeItem('subject');
        return 'Ciencias';
      case 'math':
        localStorage.removeItem('subject');
        return 'Matemáticas';
      case 'english':
        localStorage.removeItem('subject');
        return 'Ingles';
      default:
        return '';
    }
  }
  getResult(): number {
    let result;
    if (localStorage.getItem('result') == 'NaN') {
      result = 0;
    } else {
      result = parseInt(localStorage.getItem('result')!);
    }
    localStorage.removeItem('result');

    return result;
  }
}
