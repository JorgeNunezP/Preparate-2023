import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { getFirestore, addDoc } from 'firebase/firestore';
import { firebaseConfig } from '../firebaseConfig';
import { initializeApp } from 'firebase/app';
import { Topic } from '../model/topic.model';

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

@Injectable({
  providedIn: 'root',
})
export class NewSubjectService {
  constructor() {}

  saveTopic(subject: string, topic: Topic): Promise<string> {
    return new Promise(function (resolve, reject) {
      firebase
        .firestore()
        .collection('subject')
        .doc(subject)
        .collection('topic')
        .where('topic', '==', topic.getTopic())
        .get()
        .then((document) => {
          if (document.empty) {
            firebase
              .firestore()
              .collection('subject')
              .doc(subject)
              .collection('topic')
              .doc()
              .set({
                topic: topic.getTopic(),
                info: topic.getInfo(),
                example: topic.getExample(),
                urlExample: topic.getUrlExample(),
              })
              .then(() => {
                resolve('done');
              })
              .catch((error) => {
                reject(error);
              });
          } else {
            reject('Ya existe ese tema');
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
