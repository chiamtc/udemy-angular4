import {NgModule} from "@angular/core";
import {CurrentTrainingComponent} from "./current-training/current-training.component";
import {NewTrainingComponent} from "./new-training/new-training.component";
import {StopTrainingComponent} from "./current-training/stop-training.component";
import {PastTrainingsComponent} from "./past-trainings/past-trainings.component";
import {TrainingComponent} from "./training.component";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {TrainingRoutingModule} from "./training-routing.module";

@NgModule({
  declarations:[CurrentTrainingComponent,NewTrainingComponent,
    StopTrainingComponent, PastTrainingsComponent,TrainingComponent],
  imports:[ReactiveFormsModule, SharedModule, TrainingRoutingModule],
  exports:[],
  entryComponents: [StopTrainingComponent]
})
export class TrainingModule{

}
