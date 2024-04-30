import { Routes } from '@angular/router';
import { UserlistComponent } from './userlist/userlist.component';
import { UserDetailsComponent } from './user-details/user-details.component';

export const routes: Routes = [ { path: '', redirectTo: '/users', pathMatch: 'full' },
{ path: 'users', component: UserlistComponent }, 
{ path: 'user-details/:id', component: UserDetailsComponent }];
