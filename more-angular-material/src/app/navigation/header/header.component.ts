import {Component, OnInit, OnDestroy, EventEmitter, Output} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {Subscription} from 'rxjs/Subscription';
import * as fromRoot from '../../app.reducer';
import {Store} from '@ngrx/store';
import {Observable} from "rxjs/Observable";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth$:Observable<boolean>;
  authSubscription: Subscription;

  constructor(private authService: AuthService, private store:Store<fromRoot.State>) {
  }

  ngOnInit() {
   /* this.authSubscription = this.authService.authChange.subscribe((data) => {
      this.isAuth = data;
    });*/
   this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  onLogout(){
    this.authService.logout();
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

}
