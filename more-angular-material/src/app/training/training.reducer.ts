import {Action, createFeatureSelector, createSelector} from '@ngrx/store';
import {SET_AVAILABLE_TRAININGS, SET_FINISHED_TRAININGS, START_TRAINING, STOP_TRAINING} from "./training.action";
import {Exercise} from "./exercise.model";
import * as fromRoot from '../app.reducer';
import {
  TrainingAction,
  StopTraining,
  StartTraining,
  SetFinishedTrainings,
  SetAvailableTrainings
} from "./training.action";

export interface TrainingState {
  availableExercises: Exercise[];
  finishedExercises: Exercise[];
  activeTraining: Exercise;
}

//lazy routing purpose.
// fromRoot.State doesn't know trainingState but trainingState knows fromRoot.State, so
// training variable is an instance of TrainingState < this is a global state for training.
// Treat it like it's in app.reducer but only for lazy routing module. Add it in training.module instead of app.module
export interface State extends fromRoot.State {
  training: TrainingState
}

const initialState: TrainingState = {
  availableExercises: [],
  finishedExercises: [],
  activeTraining: null
};

export function trainingReducer(state = initialState, action: TrainingAction) {
  switch (action.type) {
    case SET_AVAILABLE_TRAININGS:
      return {
        ...state,
        availableExercises: action.payload
      };

    case SET_FINISHED_TRAININGS:
      return {
        ...state,
        finishedExercises: action.payload
      };

    case START_TRAINING:
      return {
        ...state,
        activeTraining: {...state.availableExercises.find(ex => ex.id=== action.payload)}
      };
    case STOP_TRAINING:
      return {
        ...state,
        activeTraining: null
      };
    default:
      return state;
  }
}

export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvailableExercises = createSelector(getTrainingState, (state: TrainingState) => state.availableExercises);
export const getFinishedExercises = createSelector(getTrainingState, (state: TrainingState) => state.finishedExercises);
export const getActiveTraining =createSelector(getTrainingState,  (state: TrainingState) => state.activeTraining);
export const getIsTraining = createSelector(getTrainingState, (state:TrainingState)=> state.activeTraining != null);
