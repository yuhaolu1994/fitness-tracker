import { AuthService } from './auth/auth.sevice';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private authSerive: AuthService) { }

  ngOnInit() {
    this.authSerive.initAuthListener();
  }
}
