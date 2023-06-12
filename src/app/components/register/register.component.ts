import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { RegisterService } from '../../services/register.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user = {
    name: '',
    email: '',
    password: '',
    password2: '',
  };

  constructor(private registerService: RegisterService) {}

  ngOnInit(): void {}

  public error: any;
  signUp() {
    if (this.user.password === this.user.password2) {
      this.registerService.signUp(
        this.user.name,
        this.user.email,
        this.user.password
      );
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Las contraseñas no coinciden',
        icon: 'error',
        confirmButtonText: 'Cerrar',
      });
    }
  }
}
