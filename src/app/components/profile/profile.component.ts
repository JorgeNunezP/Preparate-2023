import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { LoginService } from '../../services/login.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  constructor(
    private userId: LoginService,
    private profileService: ProfileService
  ) {}

  user = {
    name: this.userId.getName()!,
    email: this.userId.getEmail()!,
    password: '',
    password2: '',
    uid: this.userId.getId(),
    photo: this.userId.getPhoto(),
  };

  changePass() {
    if (this.user.password === this.user.password2) {
      this.profileService.changePasword(this.user);
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
