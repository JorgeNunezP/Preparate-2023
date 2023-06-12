import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { LoginService } from '../../services/login.service';
import { SubjectService } from '../../services/subject.service';
import { Topic } from '../../model/topic.model';

let topicsList: Topic[] = [];

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css'],
})
export class SubjectComponent {
  constructor(
    private loginService: LoginService,
    private subjectService: SubjectService
  ) {}

  public error: any;
  topics: any;
  topicListEnable = false;
  lastTopicId = '';
  currentTopic = '';
  topicData: Topic = new Topic();
  showButtons = false;
  prevEnable = true;
  nextEnable = true;

  async getTopics(subject: string) {
    if (this.currentTopic !== subject) {
      this.subjectService.cleanTopics();
      this.topics = [];
      this.subjectService
        .showTopics(subject)
        .then((response) => {
          this.topics = response;
          topicsList = this.topics;
          this.currentTopic = subject;
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

  async getLastSeen() {
    await this.subjectService
      .getLastSeen(this.currentTopic, this.loginService.getId())
      .then((response) => {
        this.lastTopicId = response;
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

  async setLastSeen() {
    this.subjectService
      .saveLastSeen(
        this.currentTopic,
        this.lastTopicId,
        this.loginService.getId()
      )
      .then((response) => {})
      .catch((error) => {
        Swal.fire({
          title: 'Error!',
          text: 'Ocurrio un error, por favor intente de nuevo. En caso de continuar con el error contacte a soporte',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        });
      });
  }

  showLastSeen() {
    this.getLastSeen().then(() => {
      const title = document.getElementById('subject');
      title!.innerHTML = this.getSubject(this.currentTopic);
      this.getTopics(this.currentTopic);
      this.topicListEnable = false;
      if (this.lastTopicId === '') {
        this.topicData = topicsList[0];
        this.lastTopicId = topicsList[0].id;
        this.SetTopicAsSeen();
      } else {
        this.topicData = topicsList.find(({ id }) => id === this.lastTopicId)!;

        this.SetTopicAsSeen();
      }
    });
    this.showButtons = true;
  }

  showTopicList() {
    this.showButtons = false;
    if (this.currentTopic !== this.currentTopic) {
      this.getTopics(this.currentTopic);
      this.topicListEnable = true;
      const title = document.getElementById('subject');
      title!.innerHTML = this.getSubject(this.currentTopic);
    } else {
      this.topicListEnable = true;
      const title = document.getElementById('subject');
      title!.innerHTML = this.getSubject(this.currentTopic);
    }
  }

  getShowTopicList() {
    return this.topicListEnable;
  }

  showSelectedTopic(topicId: string) {
    this.topicData = topicsList.find(({ id }) => id === topicId)!;
    this.lastTopicId = this.topicData.getId();
    this.setLastSeen();
    this.topicListEnable = false;
    this.showButtons = true;
    this.SetTopicAsSeen();
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

  nextTopic() {
    const nextTopic =
      topicsList.findIndex(({ id }) => id === this.lastTopicId) + 1;

    if (nextTopic < topicsList.length) {
      this.nextEnable = false;
      this.topicData = topicsList[nextTopic];
      this.lastTopicId = topicsList[nextTopic].id;
      this.setLastSeen();
      this.SetTopicAsSeen();
      this.prevEnable = true;
    } else if (nextTopic >= topicsList.length) {
      this.nextEnable = false;
      this.prevEnable = true;
    } else {
      this.topicData = topicsList[nextTopic];
      this.lastTopicId = topicsList[nextTopic].id;
      this.setLastSeen();
      this.SetTopicAsSeen();
      this.nextEnable = true;
      this.prevEnable = true;
    }
  }

  previusTopic() {
    const previusTopic =
      topicsList.findIndex(({ id }) => id === this.lastTopicId) - 1;

    if (previusTopic == 0) {
      this.prevEnable = false;
      this.topicData = topicsList[previusTopic];
      this.lastTopicId = topicsList[previusTopic].id;
      this.setLastSeen();
      this.SetTopicAsSeen();
      this.nextEnable = true;
    } else if (previusTopic < 0) {
      this.prevEnable = false;
      this.nextEnable = true;
    } else {
      this.topicData = topicsList[previusTopic];
      this.lastTopicId = topicsList[previusTopic].id;
      this.setLastSeen();
      this.SetTopicAsSeen();
      this.prevEnable = true;
      this.nextEnable = true;
    }
  }

  async SetTopicAsSeen() {
    await this.subjectService.SetTopicAsSeen(
      this.currentTopic,
      this.lastTopicId,
      this.loginService.getId()
    );
  }
}
