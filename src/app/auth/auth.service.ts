import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import * as fb from 'firebase';
import { User } from './user.model';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { ActivarLoginAction, DesactivarLoginAction } from '../shared/ui.actions';
import { SetUserAction } from './auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private subscription: Subscription = new Subscription();
  constructor(private afAuth: AngularFireAuth, private afDB: AngularFirestore, private store: Store<AppState>, private router: Router) {
  }

  initAuthListener() {
    this.afAuth.authState.subscribe((fbUser: fb.User) => {
      if (fbUser) {
        this.subscription = (
          this.afDB.doc(`${fbUser.uid}/usuario`).valueChanges()
            .subscribe((usuarioObj: any) => {
              const newUser = new User(usuarioObj);
              this.store.dispatch(new SetUserAction(newUser));
            })
        );
      } else {
        this.subscription.unsubscribe();
      }
    });
  }

  crearUsuario(nombre: string, email: string, password: string) {
    this.store.dispatch(new ActivarLoginAction());

    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(resp => {
        // console.log(resp);
        const user: User = {
          uid: resp.user.uid,
          nombre,
          email: resp.user.email
        };

        this.afDB.doc(`${user.uid}/usuario`)
          .set(user)
          .then(() => {
            this.router.navigate(['/']);
            this.store.dispatch(new DesactivarLoginAction());
          })
          ;
      })
      .catch(error => {
        this.store.dispatch(new DesactivarLoginAction());
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
    this.store.dispatch(new ActivarLoginAction());
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(resp => {
        this.store.dispatch(new DesactivarLoginAction());
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.store.dispatch(new DesactivarLoginAction());
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
