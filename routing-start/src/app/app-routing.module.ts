import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ServersComponent } from './servers/servers.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AuthGuard} from './auth-guard.service';
import { CanDeactivateGuard } from './servers/edit-server/can-deactivate-guard.service';
import { ServerResolver  } from './servers/server/server-resolver.service';

const appRouters:Routes = [
  { path: '', component: HomeComponent},
  { path: 'users', component: UsersComponent, children:[
    { path: ':id/:name', component: UserComponent}
  ]},
  { path: 'servers', //canActivate: [AuthGuard],
    canActivateChild:[AuthGuard],
    component: ServersComponent, children: [
     { path: ':id', component: ServerComponent, resolve: {server:ServerResolver} },
     { path: ':id/edit', component: EditServerComponent, canDeactivate:[ CanDeactivateGuard]}
  ]},
  //{ path: 'not-found', component: PageNotFoundComponent},
  { path: 'not-found', component: ErrorPageComponent, data:{message:'Page not found'} },
  { path: '**', redirectTo:'/not-found'}
];

@NgModule({
	imports:[
  //# useHash is to route when web deployment in the real server to 404 or other pages
  // it ignores the front part of # and parse things after the # like normal urls
	// RouterModule.forRoot(appRouters, {useHash:true})
    RouterModule.forRoot(appRouters)
	],
	exports:[RouterModule]
})
export class AppRoutingModule{

}