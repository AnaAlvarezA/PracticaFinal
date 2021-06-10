import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Componentes
import { AddContactComponent } from './components/addContact/addContact.component';
import { EditContactComponent } from './components/editContact/editContact.component';
import { ListContactsComponent } from './components/listContacts/listContacts.component';
import { PersonsComponent } from './persons/persons.component';
import { PersonComponent } from './persons/person/person.component';

// Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// Servicio HTTP
import { HttpClientModule } from '@angular/common/http';

// Servicios CRUD
import { ApiService } from './services/api.service';

// Servicios para formularios Reactivos
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
    import { MomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
    import { DatePipe } from '@angular/common';

    export const DateFormats = {
        parse: {
            dateInput: 'YYYY-MM-DD',
        },
        display: {
            dateInput: 'YYYY-MM-DD',
            monthYearLabel: 'MMM YYYY',
            dateA11yLabel: 'YYYY-MM-DD',
            monthYearA11yLabel: 'MMMM YYYY',
        },
    };

@NgModule({
  declarations: [
    AppComponent,
    AddContactComponent,
    EditContactComponent,
    ListContactsComponent,
    PersonsComponent,
    PersonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
  providers: [ApiService,
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: DateFormats }
    , DatePipe], // Para cambiar el formato de fecha Mat-Datepicker a YYYY-MM-DD
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }