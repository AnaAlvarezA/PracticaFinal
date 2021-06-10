import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddContactComponent } from './components/addContact/addContact.component';
import { EditContactComponent } from './components/editContact/editContact.component';
import { ListContactsComponent } from './components/listContacts/listContacts.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'addContact' },
  { path: 'addContact', component: AddContactComponent },
  { path: 'editContact/:id', component: EditContactComponent },
  { path: 'listContacts', component: ListContactsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }