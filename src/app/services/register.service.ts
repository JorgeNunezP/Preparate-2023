import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import Swal from 'sweetalert2';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '../firebaseConfig';
import { initializeApp } from 'firebase/app';
import { Router } from '@angular/router';
import { collection, addDoc } from 'firebase/firestore';
import { CookieService } from 'ngx-cookie-service';
import { getAuth, updateProfile } from 'firebase/auth';

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private router: Router, private cookies: CookieService) {}

  token: string | undefined;

  signUp(name: string, email: string, password: string) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const auth = getAuth();

        const user2 = auth.currentUser!;

        updateProfile(user2, {
          displayName: name,
          photoURL:
            'https://www.psdstack.com/wp-content/uploads/2019/08/copyright-free-images-750x420.jpg',
        })
          .then(() => {
            try {
              const docRef = firebase
                .firestore()
                .collection('user')
                .doc(response.user?.uid)
                .set({
                  type: false,
                });

              localStorage.setItem('user', JSON.stringify(response.user));
              firebase
                .auth()
                .currentUser?.getIdToken()
                .then((token) => {
                  this.token = token;
                  this.cookies.set('token', this.token);
                  //this.createData(response.user!.uid);
                  this.router.navigate(['/']);
                });
              Swal.fire({
                title: 'Bienvenido!',
                text: 'Gracias por crear una cuenta, ahora podras utilizar nuestros servicios',
                icon: 'success',
                confirmButtonText: 'Cerrar',
              });
            } catch (e) {
              Swal.fire({
                title: 'Error!',
                text: 'Ocurrio un error, por favor intente de nuevo. En caso de continuar con el error contacte a soporte',
                icon: 'error',
                confirmButtonText: 'Cerrar',
              });
            }
          })
          .catch((error) => {
            Swal.fire({
              title: 'Error!',
              text: error,
              icon: 'error',
              confirmButtonText: 'Cerrar',
            });
          });
      });
  }

  // createData(uid: string): Promise<string> {
  //   return new Promise(function (resolve, reject) {
  //     firebase
  //       .firestore()
  //       .collection('user')
  //       .doc(uid)
  //       .collection('lastSeenId')
  //       .doc('topicId')
  //       .set({ spanish: '', math: '', history: '', science: '', english: '' })
  //       .then(() => {
  //         resolve('done');
  //       })
  //       .catch((error) => {
  //         reject(error);
  //       });
  //   });
  // }
}
