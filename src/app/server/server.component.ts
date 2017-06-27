/* This is a server component to be included as a nest in app component.

 @xxxx = Decorator typescript feature which enhances the class/elements
 to use decorator, you might have to import it
*/

import { Component } from '@angular/core';


@Component({
  selector: 'app-server',
  templateUrl: './server.component.html'

})

export class ServerComponent{
}
