import { Component } from '@angular/core';
import { NewSubjectService } from 'src/app/services/new-subject.service';
import { Topic } from '../../model/topic.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-subject',
  templateUrl: './new-subject.component.html',
  styleUrls: ['./new-subject.component.css'],
})
export class NewSubjectComponent {
  constructor(private newSubjectService: NewSubjectService) {}

  addExampleImage = false;
  subject = '';
  topic: Topic = new Topic();

  saveTopic() {
    this.newSubjectService
      .saveTopic(this.subject, this.topic)
      .then((response) => {
        Swal.fire({
          title: 'Hecho!',
          text: 'Se guardo el subtema de manera correcta',
          icon: 'success',
          confirmButtonText: 'Cerrar',
        });
      })
      .catch((error) => {
        if (error == 'Ya existe ese tema') {
          Swal.fire({
            title: 'Error!',
            text: 'Ya existe ese tema',
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
  }

  addExample() {
    const checkBox = document.getElementById('addExample')! as HTMLInputElement;
    if (checkBox.checked == true) {
      this.topic.example = true;
      this.addExampleImage = true;
    } else {
      this.topic.example = false;
      this.addExampleImage = false;
    }
  }
}
