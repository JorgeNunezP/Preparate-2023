import { Component } from '@angular/core';
import { Question } from 'src/app/model/question.model';
import { LoginService } from 'src/app/services/login.service';
import { UserDevService } from 'src/app/services/user-dev.services';
import Swal from 'sweetalert2';
import { TestService } from '../../services/test.service';
import { UserDevelopment } from '../../model/user-development.model';
import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-user-dev',
  templateUrl: './user-dev.component.html',
  styleUrls: ['./user-dev.component.css'],
})
export class UserDevComponent {
  constructor(
    private userDevService: UserDevService,
    private loginService: LoginService,
    private testService: TestService
  ) {}

  ngOnInit() {
    this.mergeData();
  }

  userDevelopment: UserDevelopment[] = [];
  seenSubjects: string[] = [];
  data: any = [];

  subject = '';
  subjects = new Array();

  questions: Question[] = [];
  questionsSeen: string[] = [];

  a = false;
  b = true;

  async getUserDev() {
    await this.userDevService
      .getUserDev(this.loginService.getId())
      .then((response) => {
        this.userDevelopment = response;
      })
      .catch((error) => {
        Swal.fire({
          title: 'Error!',
          text: 'Ocurrio un error, por favor intente de nuevo. En caso de continuar con el error contacte a soporte',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        });
      });
  }

  async getTopics() {
    await this.userDevService
      .getTopics()
      .then((response) => {
        this.subjects = response;
        console.log(this.subjects);
      })
      .catch((error) => {
        Swal.fire({
          title: 'Error!',
          text: 'Ocurrio un error, por favor intente de nuevo. En caso de continuar con el error contacte a soporte',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        });
      });
  }

  getSubject(subject: string): string {
    switch (subject) {
      case 'spanish':
        return 'Español';
      case 'history':
        return 'Historia';
      case 'science':
        return 'Ciencias';
      case 'math':
        return 'Matemáticas';
      case 'english':
        return 'Ingles';
      default:
        return '';
    }
  }

  async mergeData() {
    await this.getUserDev().then(async (result) => {
      await this.getTopics().then(async (result) => {
        console.log(this.subjects);
        this.subjects.forEach((ele) => {
          console.log(ele);
        });
      });
    });
  }
}
