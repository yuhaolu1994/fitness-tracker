import { NgForm } from '@angular/forms';
import { TrainingService } from './../training.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Exercise } from '../exercise.model';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  // if define the exercises as Observable, use async pipe in the html page
  isLoading$: Observable<boolean>;
  exercises$: Observable<Exercise[]>;

  constructor(
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.exercises$ = this.store.select(fromTraining.getAvailableTrainings);
    this.fetchExercises();
  }

  fetchExercises() {
    // trigger the data emit from service
    this.trainingService.fetchAvailableExercises();
  }

  // not reactive form method here
  onStartTraining(form: NgForm) {
    // define the name of form component in html page
    this.trainingService.startExercise(form.value.exercise);
  }
}
