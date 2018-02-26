import {Subject} from 'rxjs/Subject';

import {Exercise} from './exercise.model';
import {Injectable} from "@angular/core";
import {AngularFirestore} from "angularfire2/firestore";
import {Subscription} from 'rxjs';
import {UiService} from "../shared/ui.service";
import * as UI from '../shared/ui.action';
import * as fromTraining from './training.reducer';
import {Store} from '@ngrx/store';
import * as Training from './training.action';
import {TrainingAction} from "./training.action";
import {take} from "rxjs/operators";
@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();
  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise;
  private fbSubs: Subscription[]=[];

  constructor(private db: AngularFirestore, private uiService:UiService, private store:Store<fromTraining.State>) {
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
          this.store.dispatch(new UI.StopLoading());/*
          this.availableExercises = exercises;
          this.exercisesChanged.next([...this.availableExercises]);*/
          this.store.dispatch(new Training.SetAvailableTrainings(exercises));
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
    /*this.runningExercise = this.availableExercises.find(
      ex => ex.id === selectedId
    );
    this.exerciseChanged.next({...this.runningExercise});*/
    this.store.dispatch(new Training.StartTraining(selectedId));
  }

  completeExercise() {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex=> {
      this.addDataToDatabase({
        ...ex,
        date: new Date(),
        state: 'completed'
      });
      this.store.dispatch(new Training.StopTraining());
      /*
      this.runningExercise = null;
      this.exerciseChanged.next(null);*/
    });
  }

  cancelExercise(progress: number) {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex=>{
      this.addDataToDatabase({
        ...ex,
        duration: ex.duration * (progress / 100),
        calories: ex.calories * (progress / 100),
        date: new Date(),
        state: 'cancelled'
      });/*
    this.runningExercise = null;
    this.exerciseChanged.next(null);*/
      this.store.dispatch(new Training.StopTraining());
    });

  }

  fetchCompletedOrCancelledExercises() {
    this.fbSubs.push(
      this.db.collection('finishedExercises')
        .valueChanges()
        .subscribe(
          (exercises: Exercise[]) => {
            this.store.dispatch(new Training.SetFinishedTrainings(exercises))
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
