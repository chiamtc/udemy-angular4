import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ServerComponent } from './server/server.component';
import { ServersComponent } from './servers/servers.component';
import { SuccessAlertComponent } from './success-alert/success-alert.component';
import { WarningAlertComponent } from './warning-alert/warning-alert.component';

/* NgModule - a decorator to make components a 'piece'
NgModule is a decorator function that takes a single metadata object whose properties describe the module. The most important properties are:

declarations - the view classes that belong to this module. Angular has three kinds of view classes: components, directives, and pipes.

exports - the subset of declarations that should be visible and usable in the component templates of other modules.

imports - other modules whose exported classes are needed by component templates declared in this module.

providers - creators of services that this module contributes to the global collection of services; they become accessible in all parts of the app.

bootstrap - the main application view, called the root component, that hosts all other app views. Only the root module should set this bootstrap property
*/
@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    ServersComponent,
    SuccessAlertComponent,
    WarningAlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],

  /* bootstrap responsible to tell angular which component to recognise when it starts*/
  bootstrap: [AppComponent]
})
export class AppModule { }
