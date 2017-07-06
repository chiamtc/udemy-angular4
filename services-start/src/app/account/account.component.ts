import { Component, Input  } from '@angular/core';
import { LoggingService } from  '../logging.service';
import { AccountsService } from '../account.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  // providers: [ LoggingService]
  //Services have hierarchy. If you state the same service in the provider array = new instance 
  //Solution to have the same instance acrosss all components is to not include in the provider array but to import
  // find account and new account components provider array.
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;
  
  constructor(private loggingService: LoggingService,
            private accountsService : AccountsService){

  }
  onSetTo(status: string) {
    this.accountsService.updateAccount(this.id, status);
    //console.log('A server status changed, new status: ' + status);
    // this.loggingService.logToConsole(status);
  }
}
