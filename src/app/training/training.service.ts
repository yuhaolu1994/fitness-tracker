import { UIService } from './../shared/ui.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { Exercise } from './exercise.model';
import { map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import * as UI from '../shared/ui.actions';
import * as Training from './training.actions';
import * as fromTraining from './training.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class TrainingService {
  private fbSubs: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    // training state defined in training reducer extends the root state
    private store: Store<fromTraining.State>
  ) { }

  fetchAvailableExercises() {
    this.store.dispatch(new UI.StartLoading());
    // real time change listener, no need to reload the app
    this.fbSubs.push(this.db
      .collection('availableExercises')
      .snapshotChanges()
      .pipe(map(docArray => {
        // throw(new Error());
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            // bypass ts type check
            // name: doc.payload.doc.data()['name'],
            // duration: doc.payload.doc.data()['duration'],
            // calories: doc.payload.doc.data()['calories']
            ...doc.payload.doc.data()
          } as Exercise;
        });
      }))
      .subscribe((exercises: Exercise[]) => {
        this.store.dispatch(new UI.StopLoading());
        this.store.dispatch(new Training.SetAvailableTrainings(exercises));
      }, error => {
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackbar('Fetching Exercises failed, please try again later', null, 3000);
      }));
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new Training.StartTraining(selectedId));
  }

  completeExercise() {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
      this.addDataToDatabase({
        ...ex,
        date: new Date(),
        state: 'completed'
      });
      this.store.dispatch(new Training.StopTraining());
    });
  }

  cancelExercise(progress: number) {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
      this.addDataToDatabase({
        ...ex,
        duration: ex.duration * (progress / 100),
        calories: ex.calories * (progress / 100),
        date: new Date(),
        state: 'cancelled'
      });
      this.store.dispatch(new Training.StopTraining());
    });
  }

  fetchCompletedOrCancelledExercises() {
    this.fbSubs.push(this.db
      .collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises: Exercise[]) => {
        this.store.dispatch(new Training.SetFinishedTrainings(exercises));
      }));
  }
  
  // cancel subscriptions when logout
  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }
  
  // save data to firebase after cancel or complete the exercise
  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
