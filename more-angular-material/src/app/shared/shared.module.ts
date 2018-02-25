import {NgModule} from "@angular/core";
import {MaterialModule} from "../material.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [CommonModule, MaterialModule,
    FlexLayoutModule, FormsModule],
  exports: [CommonModule, MaterialModule,
    FlexLayoutModule, FormsModule]
})
export class SharedModule {
}
