import { NgForm } from '@angular/forms';
import { TrainingService } from './../training.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  // if define the exercises as Observable, use async pipe in the html page
  exercises: Exercise[];
  exerciseSubscription: Subscription;

  constructor(
    private trainingService: TrainingService
  ) { }

  ngOnInit() {
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(exercises => {
      // receive the data emitted from service
      this.exercises = exercises;
    });
    // trigger the data emit from service
    this.trainingService.fetchAvailableExercises();
  }

  // not reactive form method here
  onStartTraining(form: NgForm) {
    // define the name of form component in html page
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
  }
}
