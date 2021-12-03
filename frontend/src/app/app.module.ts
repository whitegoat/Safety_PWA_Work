﻿import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { ModalModule } from 'ngx-bootstrap/modal';


import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { HomeComponent } from './home';;
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SafetyModule } from './safety/safety.module';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';

import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';;
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

  
const dbConfig: DBConfig  = {
    name: 'SAFETY_REPORTS',
    version: 1,
    objectStoresMeta: [{
      store: 'OFFLINE_RECORDS',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'ReportTypes', keypath: 'ReportTypes', options: { unique: true } },
        { name: 'Classes', keypath: 'Classes', options: { unique: true } },
        { name: 'ReportedBy', keypath: 'ReportedBy', options: { unique: true } },
        { name: 'AreaLines', keypath: 'AreaLines', options: { unique: true } },
        { name: 'Machines', keypath: 'Machines', options: { unique: true } },
      ]
    }]
  };
  

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        SafetyModule,
        NgSelectModule,
        ModalModule.forRoot(),
        NgxIndexedDBModule.forRoot(dbConfig),
        NgbModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };