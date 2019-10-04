import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import * as fb from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private router: Router) {
  }

  initAuthListener() {
    this.afAuth.authState.subscribe((fbUser: fb.User) => {
      console.log(fbUser);
    });
  }

  crearUsuario(nombre: string, email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(resp => {
        // console.log(resp);
        this.router.navigate(['/']);
      })
      .catch(error => {
        // console.error(error);
        Swal.fire({
          title: 'Error en el Login!',
          text: error.message,
          type: 'error',
          confirmButtonText: 'OK'
        });
      })
      ;
  }

  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(resp => {
        // console.log(resp);
        this.router.navigate(['/']);
      })
      .catch(error => {
        // console.error(error);
        Swal.fire({
          title: 'Error en el Login!',
          text: error.message,
          type: 'error',
          confirmButtonText: 'OK'
        });
      })
      ;
  }

  logout() {
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.afAuth.authState
      .pipe(
        map(fbUser => {
          if (fbUser == null) {
            this.router.navigate(['/login']);
          }
          return fbUser !== null;
        })
      );
  }
}
