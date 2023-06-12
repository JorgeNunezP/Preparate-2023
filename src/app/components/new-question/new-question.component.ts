import { Component } from '@angular/core';
import { Question } from 'src/app/model/question.model';
import { Topic } from 'src/app/model/topic.model';
import { NewQuestionService } from 'src/app/services/new-question.service';
import Swal from 'sweetalert2';
import readXlsxFile from 'read-excel-file';

let topicsList: Topic[] = [];

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.css'],
})
export class NewQuestionComponent {
  constructor(private newQuestionService: NewQuestionService) {}

  question: Question = new Question();
  subject = '';
  topicId = '';
  topics: any;

  saveQuestion() {
    if (this.question.correctAnswer > 0 && this.question.correctAnswer <= 4) {
      this.newQuestionService
        .saveQuestion(this.subject, this.topicId, this.question)
        .then((response) => {
          Swal.fire({
            title: 'Hecho!',
            text: 'Se guardo el subtema de manera correcta',
            icon: 'success',
            confirmButtonText: 'Cerrar',
          });
        })
        .catch((error) => {
          if (error == 'Ya existe esa pregunta') {
            Swal.fire({
              title: 'Error!',
              text: 'Ya existe esa pregunta',
              icon: 'error',
              confirmButtonText: 'Cerrar',
            });
          } else {
            Swal.fire({
              title: 'Error!',
              text: 'Ocurrio un error, por favor intente de nuevo. En caso de continuar con el error contacte a soporte',
              icon: 'error',
              confirmButtonText: 'Cerrar',
            });
          }
        });
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'El número de la respuesta correcta es invalido, por favor reviselo',
        icon: 'error',
        confirmButtonText: 'Cerrar',
      });
    }
  }

  async getTopics() {
    if (this.subject !== '') {
      this.newQuestionService.cleanTopics();
      this.topics = [];
      await this.newQuestionService
        .getTopics(this.subject)
        .then((response) => {
          this.topics = response;
          topicsList = this.topics;
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
  }

  // readFromExcel() {
  //   const input = document.getElementById('input') as HTMLInputElement;

  //   const files = input.files!;
  //   readXlsxFile(files[0]).then((rows) => {
  //     rows.forEach(async (element) => {
  //       let questionr: Question = new Question();
  //       let sub = '';
  //       let topicid = '';
  //       sub = element[0].toString();
  //       topicid = element[1].toString();
  //       questionr.question = element[2].toString();
  //       questionr.answer1 = element[3].toString();
  //       questionr.answer2 = element[4].toString();
  //       questionr.answer3 = element[5].toString();
  //       questionr.answer4 = element[6].toString();
  //       questionr.correctAnswer = parseInt(element[7].toString());
  //       await this.newQuestionService
  //         .saveQuestion(sub, topicid, questionr)
  //         .then((response) => {
  //           Swal.fire({
  //             title: 'Hecho!',
  //             text: 'Se guardo el subtema de manera correcta',
  //             icon: 'success',
  //             confirmButtonText: 'Cerrar',
  //           });
  //         })
  //         .catch((error) => {
  //           if (error == 'Ya existe esa pregunta') {
  //             Swal.fire({
  //               title: 'Error!',
  //               text: 'Ya existe esa pregunta',
  //               icon: 'error',
  //               confirmButtonText: 'Cerrar',
  //             });
  //           } else {
  //             Swal.fire({
  //               title: 'Error!',
  //               text: 'Ocurrio un error, por favor intente de nuevo. En caso de continuar con el error contacte a soporte',
  //               icon: 'error',
  //               confirmButtonText: 'Cerrar',
  //             });
  //           }
  //         });
  //     });
  //   });
  // }
}
