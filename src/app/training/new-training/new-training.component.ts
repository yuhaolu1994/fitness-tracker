import { NgForm } from '@angular/forms';
import { TrainingService } from './../training.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Exercise } from '../exercise.model';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  // if define the exercises as Observable, use async pipe in the html page
  exercises: Exercise[];
  isLoading$: Observable<boolean>;
  private exerciseSubscription: Subscription;

  constructor(
    private trainingService: TrainingService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(exercises => {
      // receive the data emitted from service
      this.exercises = exercises;
    });
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

  ngOnDestroy() {
    // only if the subscription is not undefined
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
  }
}
