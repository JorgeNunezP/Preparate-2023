import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { getFirestore, addDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { firebaseConfig } from '../firebaseConfig';
import { initializeApp } from 'firebase/app';
import { Topic } from '../model/topic.model';

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

let topics: Topic[] = [];

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  constructor() {}

  async showTopics(subject: string): Promise<Topic[]> {
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

  async getLastSeen(subject: string, uid: string): Promise<string> {
    return new Promise(async function (resolve, reject) {
      const docRef = doc(db, 'user', uid, 'subject', subject);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(docSnap.data());
        resolve(docSnap.data()['lastSeen']);
      } else {
        resolve('');
      }
      // firebase
      //   .firestore()
      //   .collection('user')
      //   .doc(uid)
      //   .collection('lastSeenId')
      //   .doc('topicId')
      //   .get()
      //   .then(function (querySnapshot) {
      //     const result = querySnapshot.data()!;
      //     resolve(result[subject]);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     reject(error);
      //   });
    });
  }

  saveLastSeen(subject: string, topicId: string, uid: string): Promise<string> {
    return new Promise(function (resolve, reject) {
      firebase
        .firestore()
        .collection('user')
        .doc(uid)
        .collection('subject')
        .doc(subject)
        .set({ lastSeen: topicId })
        .then(() => {
          resolve('done');
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  cleanTopics() {
    topics = [];
  }

  SetTopicAsSeen(
    subject: string,
    topicId: string,
    uid: string
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

      if (!docSnap.exists()) {
        await setDoc(docRef, {});
      }
      // firebase
      //   .firestore()
      //   .collection('user')
      //   .doc(uid)
      //   .collection('subject').doc(subject).collection(topicId)
      //   .where(topicId, '!=', 0)
      //   .get()
      //   .then((document) => {
      //     if (document.empty) {
      //       firebase
      //         .firestore()
      //         .collection('userProgress')
      //         .doc(uid)
      //         .collection('subject')
      //         .doc(subject)
      //         .update({ [topicId]: 0 })
      //         .then(() => {
      //           resolve('done');
      //         })
      //         .catch((error) => {
      //           if (error.code === 'not-found') {
      //             firebase
      //               .firestore()
      //               .collection('userProgress')
      //               .doc(uid)
      //               .collection('subject')
      //               .doc(subject)
      //               .set({ [topicId]: 0 })
      //               .then(() => {
      //                 resolve('done');
      //               })
      //               .catch((error) => {
      //                 reject(error);
      //               });
      //           } else {
      //             reject(error);
      //           }
      //         });
      //     }
      //   })
      //   .catch((error) => {
      //     reject(error);
      //   });
    });
  }
}
