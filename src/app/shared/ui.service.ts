import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class UIService {

  constructor(private snackbar: MatSnackBar) {}

  showSnackbar(message, action, duration) {
    this.snackbar.open(message, action, {
      duration: duration
    });
  }
}
