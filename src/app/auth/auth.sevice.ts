import { Subject } from "rxjs";
import { AuthData } from "./auth-data.model";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService
  ) { }

  initAuthListener() {
    // emit event when authentication state change
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        // emit value through rxjs
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthData) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
  }

  login(authData: AuthData) {
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  isAuth() {
    // undefined is a primitive value, null is an object
    // use == for type conversion in this case, undefined != null returns false
    return this.isAuthenticated;
  }
}
