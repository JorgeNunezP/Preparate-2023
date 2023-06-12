import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { TestService } from '../../services/test.service';
import { LoginService } from '../../services/login.service';
import { Question } from '../../model/question.model';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent {
  constructor(
    private router: Router,
    private testService: TestService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.getSeenSubjects();
  }

  start = false;
  avance = 0;
  total = 0;
  count = 0;
  seenEmpaty = true;

  seenSubjects: string[] = [];
  seenTopics: string[] = [];
  questions: Question[] = [];
  questionsSeen = new Array();
  test: any[] = [];

  questionId: any;
  subject: any;
  topic: any;
  mv = [];
  question: any;
  answer1: any;
  answer2: any;
  answer3: any;
  answer4: any;
  correct: any;

  userProgress = new Array();

  corrrectAnswered = 0;

  startTest() {
    if (this.subject != undefined) {
      this.start = true;
      this.getSeenTopics().then(() => {
        this.getQuestions().then(() => {
          this.getQuestsionsSeen().then(() => {
            this.makeTest();
            this.questionData(this.test);
          });
        });
      });
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Seleccione una materia antes de oprimir el boton',
        icon: 'error',
        confirmButtonText: 'Cerrar',
      });
    }
  }

  questionData(quiz: any) {
    if (this.avance === this.total) {
      let result = (this.corrrectAnswered / this.total) * 100;
      localStorage.setItem('result', result.toString());
      localStorage.setItem('subject', this.subject);
      this.saveCorrectAnswered();
      this.router.navigate(['/result']);
    } else {
      this.topic = quiz[this.count].topicId;
      this.questionId = quiz[this.count].questionId;
      this.question = quiz[this.count].question;
      this.answer1 = quiz[this.count].answer1;
      this.answer2 = quiz[this.count].answer2;
      this.answer3 = quiz[this.count].answer3;
      this.answer4 = quiz[this.count].answer4;
      this.correct = quiz[this.count].correctAnswer;
    }
  }

  next(answer: number) {
    if (this.correct == answer) {
      this.corrrectAnswered++;
      this.userProgress.push({
        topicId: this.topic,
        questionId: this.questionId,
      });
    }
    this.avance++;
    this.count++;
    this.questionData(this.test);
  }

  async getSeenSubjects() {
    await this.testService
      .getSeenSubjects(this.loginService.getId())
      .then((response) => {
        this.seenSubjects = response;
        this.seenEmpaty = false;
      })
      .catch((error) => {
        this.seenEmpaty = true;
        Swal.fire({
          title: 'Error!',
          text: 'Ocurrio un error, por favor intente de nuevo. En caso de continuar con el error contacte a soporte',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        });
      });
  }

  async getSeenTopics() {
    await this.testService
      .getSeenTopics(this.loginService.getId(), this.subject)
      .then((response) => {
        this.seenTopics = response;
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: 'Error!',
          text: 'Ocurrio un error, por favor intente de nuevo. En caso de continuar con el error contacte a soporte',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        });
      });
  }

  async getQuestions() {
    await this.testService
      .getQuestions(this.subject, this.seenTopics)
      .then((response) => {
        this.questions = response;
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

  async getQuestsionsSeen() {
    await this.testService
      .getQuestionsSeen(
        this.loginService.getId(),
        this.subject,
        this.seenTopics
      )
      .then((response) => {
        this.questionsSeen = response;
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: 'Error!',
          text: 'Ocurrio un error, por favor intente de nuevo. En caso de continuar con el error contacte a soporte',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        });
      });
  }

  makeTest() {
    // + Examen Personalizado +
    this.test = [];
    let testQuestions = new Array();
    let questions = new Array();

    this.seenTopics.forEach((value) => {
      this.questions.forEach((value2) => {
        if (value == value2.getTopicId()) {
          if (
            this.questionsSeen.find(
              ({ questionId }) => questionId === value2.questionId
            )
          ) {
            let data = this.questionsSeen.find(
              ({ questionId }) => questionId === value2.questionId
            );
            if (data['times'] < 5) {
              questions.push({
                topicId: value2.topicId,
                questionId: value2.questionId,
                question: value2.question,
                answer1: value2.answer1,
                answer2: value2.answer2,
                answer3: value2.answer3,
                answer4: value2.answer4,
                correctAnswer: value2.correctAnswer,
                times: data['times'],
              });
            }
          } else {
            questions.push({
              topicId: value2.topicId,
              questionId: value2.questionId,
              question: value2.question,
              answer1: value2.answer1,
              answer2: value2.answer2,
              answer3: value2.answer3,
              answer4: value2.answer4,
              correctAnswer: value2.correctAnswer,
              times: 0,
            });
          }
        }
      });
      testQuestions.push({
        sub: value,
        ques: questions.slice(),
      });
      questions = [];
    });

    //  - Ordena de mayor cantidad de preguntas a menor
    testQuestions.sort((a, b) => {
      return b.quest - a.quest;
    });

    let div = 20 / Object.keys(this.seenTopics).length;
    let restos = testQuestions.length % 3;
    var cantQ = div;

    for (let i = 0; i < testQuestions.length; i += 1) {
      if (cantQ === 0 && restos > 0) {
        cantQ += 1;
      }
      for (
        let j = 0, x = testQuestions[i].ques.length;
        j < cantQ && j < x;
        j += 1
      ) {
        var rand = this.getRndInteger(0, testQuestions[i].ques.length);
        this.test.push(testQuestions[i].ques[rand]);
        testQuestions[i].ques.splice(rand, 1);
      }
    }
    this.total = this.test.length;
  }

  getRndInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  async saveCorrectAnswered() {
    this.userProgress.forEach(async (element) => {
      await this.testService
        .saveCorrectAnswered(
          this.loginService.getId(),
          this.subject,
          element.topicId,
          element.questionId
        )
        .then(() => {})
        .catch(() => {});
    });
  }
}
