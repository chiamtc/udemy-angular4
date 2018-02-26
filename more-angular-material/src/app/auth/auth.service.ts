import {Subject} from 'rxjs/Subject';
import {AuthData} from "./auth-data.model";
import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {AngularFireAuth} from "angularfire2/auth";
import {TrainingService} from "../training/training.service";
import {MatSnackBar} from "@angular/material";
import {UiService} from "../shared/ui.service";
import {Store} from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.action';
import * as Auth from './auth.action';
@Injectable()
export class AuthService {
  private isAuthenticated: boolean = false;
  //authChange = new Subject<boolean>();
  constructor(private router: Router, private auth: AngularFireAuth, private trainingService: TrainingService,
              private uiService:UiService, private store:Store<fromRoot.State>) {
  }

  initAuthListener() {
    //authState is from angularfireauth = emits something whne authnetication chagnes.
    this.auth.authState.subscribe(user => {
      console.log(user);
      if (user) {
        this.store.dispatch(new Auth.SetAuthenticated());
        /*this.isAuthenticated = true;
        this.authChange.next(true);*/
        this.router.navigate(['/training']);
      } else {
        this.store.dispatch(new Auth.SetUnauthenticated());
        /*this.isAuthenticated = false;
        this.authChange.next(false);*/
        this.router.navigate(['/login']);
        this.trainingService.cancelSubscription();
      }
    });
  }

  registerUser(authData: AuthData) {
    //this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.auth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.store.dispatch(new UI.StopLoading());
        console.log(result);
      })
      .catch(err => {
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackbar(err.message, null, 3000);
        console.log(err);
      });
  }

  login(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    this.auth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log(result);
        this.store.dispatch(new UI.StopLoading());
      })
      .catch(err => {
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackbar(err.message, null, 3000);
        console.log(err);
      });
  }

  logout() {
    this.auth.auth.signOut();
  }

 /* isAuth() {
    return this.isAuthenticated;
  }*/

}
