import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import {
  doc,
  getDoc,
  getFirestore,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { firebaseConfig } from '../firebaseConfig';
import { initializeApp } from 'firebase/app';
import { Question } from '../model/question.model';

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

let subjects: string[] = [];

let questions: Question[] = [];

let questionsSeen = new Array();

let topics: string[] = [];

@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor() {}

  getSeenSubjects(uid: string): Promise<string[]> {
    return new Promise(function (resolve, reject) {
      firebase
        .firestore()
        .collection('user')
        .doc(uid)
        .collection('subject')
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (document) {
            subjects.push(document.id);
          });
          resolve(subjects);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getSeenTopics(uid: string, subject: string): Promise<string[]> {
    return new Promise(async function (resolve, reject) {
      firebase
        .firestore()
        .collection('user')
        .doc(uid)
        .collection('subject')
        .doc(subject)
        .collection('question')
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (document) {
            topics.push(document.id);
          });
          resolve(topics);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getQuestions(subject: string, topicId: string[]): Promise<Question[]> {
    return new Promise(async function (resolve, reject) {
      topicId.forEach((id) => {
        firebase
          .firestore()
          .collection('subject')
          .doc(subject)
          .collection('topic')
          .doc(id)
          .collection('question')
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (document) {
              let questionData: Question = new Question();
              questionData.setData(id, document.id, document.data());
              questions.push(questionData);
            });
          })
          .catch((error) => {
            reject(error);
          });
      });
      resolve(questions);
    });
  }

  async getQuestionsSeen(
    uid: string,
    subject: string,
    topicId: string[]
  ): Promise<string[]> {
    return new Promise(async function (resolve, reject) {
      topicId.forEach((id) => {
        firebase
          .firestore()
          .collection('user')
          .doc(uid)
          .collection('subject')
          .doc(subject)
          .collection('topic')
          .doc(id)
          .collection('question')
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (document) {
              Object.keys(document.data()).forEach((data) => {
                if (data != 'id') {
                  let questionSeen = {
                    questionId: '',
                    times: 0,
                    topicId: '',
                  };
                  questionSeen.questionId = data;
                  questionSeen.times = document.data()[data];
                  questionSeen.topicId = document.id;
                  questionsSeen.push(questionSeen);
                }
              });
            });
            resolve(questionsSeen);
          })
          .catch((error) => {
            reject(error);
          });
      });
    });
  }

  saveCorrectAnswered(
    uid: string,
    subject: string,
    topicId: string,
    questionId: string
  ): Promise<string> {
    return new Promise(async function (resolve, reject) {
      const docRef = doc(
        db,
        'user',
        uid,
        'subject',
        subject,
        'question',
        topicId
      );
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        await updateDoc(docRef, {
          [questionId]: docSnap.data()[questionId] + 1,
        });
        resolve('done');
      } else {
        await setDoc(docRef, {
          [questionId]: 1,
        });
        resolve('done');
      }
    });
  }
}
