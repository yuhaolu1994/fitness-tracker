import { NgForm } from '@angular/forms';
import { TrainingService } from './../training.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  exercises: Observable<any>;

  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore
  ) { }

  ngOnInit() {
    // real time change listener, no need to reload the app
    this.exercises = this.db.collection('availableExercises').valueChanges();
  }

  // not reactive form method here
  onStartTraining(form: NgForm) {
    // define the name of form component in html page
    this.trainingService.startExercise(form.value.exercise);
  }
}
