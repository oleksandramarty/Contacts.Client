import {AppHeaderComponent} from "./app-header/app-header.component";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ReactiveFormsModule} from "@angular/forms";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {NgModule} from "@angular/core";

@NgModule({
    declarations: [
        AppHeaderComponent,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,

        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
    ],
    exports: [
        AppHeaderComponent,
    ]
})
export class AppCommonModule {}