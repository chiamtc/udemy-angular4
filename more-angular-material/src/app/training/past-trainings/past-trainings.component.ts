import {Component, OnInit, OnDestroy} from '@angular/core';
import {MatTableDataSource} from '@angular/material';

import {Exercise} from '../exercise.model';
import {TrainingService} from '../training.service';
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, OnDestroy {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  exercisesSubscription:Subscription;
  constructor(private trainingService: TrainingService) {
  }

  ngOnInit() {
    this.exercisesSubscription = this.trainingService.finishedExercisesChanged.subscribe((exercises: Exercise[]) => {
      this.dataSource.data = exercises;
    });
    this.trainingService.fetchCompletedOrCancelledExercises();
  }

  ngOnDestroy(){
    if(this.exercisesSubscription) {
      this.exercisesSubscription.unsubscribe();
    }
  }
}
