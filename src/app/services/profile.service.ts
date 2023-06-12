import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import Swal from 'sweetalert2';
import { getFirestore, getDocs, updateDoc } from 'firebase/firestore';
import { firebaseConfig } from '../firebaseConfig';
import { initializeApp } from 'firebase/app';

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(router: Router) {}

  editUser(user: any) {}

  async changePasword(user: any) {
    firebase
      .firestore()
      .collection('users')
      .where('uid', '==', user.uid)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (document) {
          document.ref.update({ name: 'jorget' });
          Swal.fire({
            text: 'La contraseña ha sido cambiada.',
            icon: 'success',
            confirmButtonText: 'Cerrar',
          });
        });
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
