import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { getFirestore, addDoc } from 'firebase/firestore';
import { firebaseConfig } from '../firebaseConfig';
import { initializeApp } from 'firebase/app';
import { Topic } from '../model/topic.model';
import { Question } from '../model/question.model';

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

let topics: Topic[] = [];

@Injectable({
  providedIn: 'root',
})
export class NewQuestionService {
  constructor() {}

  cleanTopics() {
    topics = [];
  }

  async getTopics(subject: string): Promise<Topic[]> {
    return new Promise(function (resolve, reject) {
      firebase
        .firestore()
        .collection('subject')
        .doc(subject)
        .collection('topic')
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (document) {
            let topicData: Topic = new Topic();
            topicData.setData(document.id, document.data());
            topics.push(topicData);
          });
          resolve(topics);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  saveQuestion(
    subject: string,
    topicId: string,
    question: Question
  ): Promise<string> {
    return new Promise(function (resolve, reject) {
      firebase
        .firestore()
        .collection('subject')
        .doc(subject)
        .collection('topic')
        .doc(topicId)
        .collection('question')
        .where('question', '==', question.getQuestion())
        .get()
        .then((document) => {
          if (document.empty) {
            firebase
              .firestore()
              .collection('subject')
              .doc(subject)
              .collection('topic')
              .doc(topicId)
              .collection('question')
              .doc()
              .set({
                question: question.getQuestion(),
                answer1: question.getAnswer1(),
                answer2: question.getAnswer2(),
                answer3: question.getAnswer3(),
                answer4: question.getAnswer4(),
                correctAnswer: question.getCorrectAnswer(),
              })
              .then(() => {
                resolve('done');
              })
              .catch((error) => {
                reject(error);
              });
          } else {
            reject('Ya existe esa pregunta');
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
