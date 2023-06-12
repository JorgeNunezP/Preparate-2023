import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private loginService: LoginService, private router: Router) {}

  user = {
    email: '',
    password: '',
  };

  public error: any;

  async login() {
    await this.loginService
      .login(this.user.email, this.user.password)
      .then((response) => {
        this.router.navigate(['/']).then(() => {
          location.reload();
        });
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          this.error =
            'Usuario no encontrado, por favor revise los datos y vuelva a intentar';
        } else if (error.code === 'auth/invalid-email') {
          this.error =
            'Correo invalido, por favor revise los datos y vuelva a intentar';
        } else if (error.code === 'auth/wrong-password') {
          this.error =
            'Contraseña, incorrecta, por favor revise los datos y vuelva a intentar';
        } else {
          this.error = 'Por favor revise los datos y vuelva a intentar';
        }
        Swal.fire({
          title: 'Error!',
          text: this.error,
          icon: 'error',
          confirmButtonText: 'Cerrar',
        });
      });
  }
}
