import { NgForm } from '@angular/forms';
import { TrainingService } from './../training.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Exercise } from '../exercise.model';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  // if define the exercises as Observable, use async pipe in the html page
  exercises: Exercise[];
  isLoading = true;
  private exerciseSubscription: Subscription;
  private loadingSubscription: Subscription;

  constructor(
    private trainingService: TrainingService,
    private uiService: UIService
  ) { }

  ngOnInit() {
    // set up the listener/subscribe
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
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
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }
}
