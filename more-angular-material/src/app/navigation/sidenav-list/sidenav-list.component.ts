import {Component, OnInit, EventEmitter, Output, OnDestroy} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {Subscription} from "rxjs/Subscription";
import * as fromRoot from '../../app.reducer';
import {Store} from '@ngrx/store';
import {Observable} from "rxjs/Observable";


@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() closeSidenav = new EventEmitter<void>();
  isAuth$:Observable<boolean>;
  authSubscription:Subscription;
  constructor(private authService: AuthService, private store:Store<fromRoot.State>) {
  }

  ngOnInit() {
    /*this.authService.authChange.subscribe((data) => {
      this.isAuth = data;
    })*/
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  ngOnDestroy(){
    this.authSubscription.unsubscribe();
  }

  onLogout(){
    this.onClose();
    this.authService.logout();
  }

  onClose() {
    this.closeSidenav.emit();
  }

}
