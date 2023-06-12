import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import {
  doc,
  getDoc,
  getFirestore,
  getDocs,
  setDoc,
  updateDoc,
  query,
  collection,
  getCountFromServer,
} from 'firebase/firestore';
import { firebaseConfig } from '../firebaseConfig';
import { initializeApp } from 'firebase/app';
import { UserDevelopment } from '../model/user-development.model';
import { Topic } from '../model/topic.model';

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

let userDev: UserDevelopment[] = [];

let topics: any = [];

let subjects: any = [];

@Injectable({
  providedIn: 'root',
})
export class UserDevService {
  getUserDev(uid: string): Promise<UserDevelopment[]> {
    return new Promise(async (resolve, reject) => {
      firebase
        .firestore()
        .collection('user')
        .doc(uid)
        .collection('subject')
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(async function (document) {
            const querySnapshot = await getDocs(
              collection(db, 'user', uid, 'subject', document.id, 'question')
            );
            querySnapshot.forEach((doc) => {
              Object.keys(doc.data()).forEach((times) => {
                const dev = new UserDevelopment();
                dev.setData(document.id, doc.id, doc.data()[times]);
                userDev.push(dev);
              });
            });
          });
          resolve(userDev);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async getTopics(): Promise<Topic[]> {
    return new Promise(async (resolve, reject) => {
      firebase
        .firestore()
        .collection('subject')
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(async function (document) {
            const query = await getDocs(
              collection(db, 'subject', document.id, 'topic')
            );
            console.log(document.id);
            topics = [];
            console.log(topics);
            query.forEach(async (doc) => {
              console.log(doc.data());
              const query2 = collection(
                db,
                'subject',
                document.id,
                'topic',
                doc.id,
                'question'
              );
              const count = getCount(document.id, doc.id);
              //const snapshot = await getCountFromServer(query2);
              //console.log(document.id, doc.id, snapshot.data().count);
              console.log(count);
              topics.push({
                topicId: doc.id,
                topicName: doc.data()['topic'],
                countQuestion: count,
              });
            });
            subjects.push({ subject: document.id, topics });
          });

          console.log(subjects);
          resolve(subjects);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
async function getCount(subject: string, topic: string): Promise<Number> {
  return new Promise(async (resolve, reject) => {
    const query2 = collection(
      db,
      'subject',
      subject,
      'topic',
      topic,
      'question'
    );
    const snapshot = await getCountFromServer(query2);
    resolve(snapshot.data().count);
  });
}
