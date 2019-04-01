import { Subject } from "rxjs";
import { AuthData } from "./auth-data.model";
import { User } from "./user.model";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;

  constructor(private router: Router) {}

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authSucessfully();
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authSucessfully();
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  getUser() {
    // use spread operator to spread the property of the user object
    // return a different object with the same property
    return { ...this.user };
  }

  isAuth() {
    // undefined is a primitive value, null is an object
    // use == for type conversion in this case, undefined != null returns false
    return this.user != null;
  }

  private authSucessfully() {
    // emit value through rxjs
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
}
