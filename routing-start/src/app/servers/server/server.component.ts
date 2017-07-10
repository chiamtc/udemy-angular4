import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params,Router, Data } from '@angular/router';
import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService, private route: ActivatedRoute
    , private router:Router) { }

  ngOnInit() {
      this.route.data.subscribe(
          (data: Data) => {
            //the data["server"] variable is found and equals to the approuting module
            this.server = data["server"];
          }
        );
  	/*const id = +this.route.snapshot.params["id"]; // id = string here
    this.server = this.serversService.getServer(id);
    this.route.params.subscribe(
    	(params:Params) => {
    		this.server = this.serversService.getServer(+params["id"]);
    	});*/
  }

  onEdit(){
    //since this button is on server.component, you can just use below codes with relativeTo
    // instead of this.router.navigate(['/servers', this.server.id, 'edit'])
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
    
  }

}
