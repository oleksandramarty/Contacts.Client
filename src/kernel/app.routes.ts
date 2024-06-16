import {RouterModule, RouterOutlet, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {AppContactsComponent} from "../modules/areas/contacts/app-contacts/app-contacts.component";
import {AppComponent} from "../modules/areas/app-area/app/app.component";
import {AppNotFoundComponent} from "../modules/areas/not-found/app-not-found/app-not-found.component";

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'contacts'},
    {path: 'contacts', component: AppContactsComponent},
    {path: 'not-found', component: AppNotFoundComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'not-found'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule, RouterOutlet],
})
export class AppRoutingModule {}
