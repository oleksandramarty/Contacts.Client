import {CommonModule, registerLocaleData} from "@angular/common";
import localeEN from '@angular/common/locales/en';
import {LOCALE_ID, NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BaseUrlInterceptor} from "../../../kernel/api.interceptor";
import {MAT_DATE_FORMATS} from "@angular/material/core";
import {RouterModule, RouterOutlet} from "@angular/router";
import {MatSidenavModule} from "@angular/material/sidenav";
import {environment} from "../../../kernel/environments/environment";
import {AppRoutingModule, routes} from "../../../kernel/app.routes";
import {APOLLO_OPTIONS, ApolloModule} from "apollo-angular";
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import {AppComponent} from "./app/app.component";
import {AppCommonModule} from "../../common/app-common.module";
import {AppContactsModule} from "../contacts/app-contacts/app-contacts.module";

export const MY_FORMATS = {
    parse: {
        dateInput: 'DD.MM.YYYY',
    },
    display: {
        dateInput: 'DD.MM.YYYY',
        monthYearLabel: 'MMMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

registerLocaleData(localeEN, 'en');

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        AppRoutingModule,
        RouterModule.forRoot(routes),
        BrowserModule,
        CommonModule,
        FormsModule,
        HttpClientModule,

        AppCommonModule,
        AppContactsModule,

        ApolloModule,
        MatSidenavModule
    ],
    providers: [ {
            provide: APOLLO_OPTIONS,
            useFactory: (httpLink: HttpLink) => {
                return {
                    cache: new InMemoryCache(),
                    link: httpLink.create({
                        uri: environment.graphQLUrl
                    })
                };
            },
            deps: [HttpLink]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: BaseUrlInterceptor,
            multi: true,
        },
        {provide: LOCALE_ID, useValue: 'en-US'},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
