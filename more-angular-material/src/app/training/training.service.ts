import {Subject} from 'rxjs/Subject';

import {Exercise} from './exercise.model';
import {Injectable} from "@angular/core";
import {AngularFirestore} from "angularfire2/firestore";
import {Subscription} from 'rxjs';
import {UiService} from "../shared/ui.service";
import * as UI from '../shared/ui.action';
import * as fromRoot from '../app.reducer';
import {Store} from '@ngrx/store';
@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();
  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise;
  private fbSubs: Subscription[]=[];

  constructor(private db: AngularFirestore, private uiService:UiService, private store:Store<fromRoot.State>) {
  }

  fetchAvailableExercises() {
    this.store.dispatch(new UI.StartLoading());
    this.fbSubs.push(this.db
      .collection('availableExercises')
      .snapshotChanges() //gives meta data and the "real" data from firebase
      .map(docData => {
        return docData.map(doc => {
          return {
            id: doc.payload.doc.id,
            name: doc.payload.doc.data().name, //use data() to get the data from firebase
            duration: doc.payload.doc.data().duration,
            calories: doc.payload.doc.data().calories,
          } as Exercise;
        })
      })
      .subscribe(
        (exercises: Exercise[]) => {
          this.store.dispatch(new UI.StopLoading());
          this.availableExercises = exercises;
          this.exercisesChanged.next([...this.availableExercises]);
        },
        (error)=>{
          this.store.dispatch(new UI.StopLoading());
          this.uiService.showSnackbar("Fetching available exercises failed", null, 3000);
        })
    );
  }

  startExercise(selectedId: string) {
    //select a single document using doc() to update/delete/set field of the doc.
    //this.db.doc('availableExercises/'+selectedId).update({lastSelected: new Date()});
    this.runningExercise = this.availableExercises.find(
      ex => ex.id === selectedId
    );
    this.exerciseChanged.next({...this.runningExercise});
  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getRunningExercise() {
    return {...this.runningExercise};
  }

  fetchCompletedOrCancelledExercises() {
    this.fbSubs.push(
      this.db.collection('finishedExercises')
        .valueChanges()
        .subscribe(
          (exercises: Exercise[]) => {
            this.finishedExercisesChanged.next(exercises);
          })
    );
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db
      .collection('finishedExercises')
      .add(exercise);
  }

  cancelSubscription(){
    this.fbSubs.forEach(sub => sub.unsubscribe())
  }
}
