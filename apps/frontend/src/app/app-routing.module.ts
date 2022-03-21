import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NgxUiModule, WelcomeComponent } from '@linktank/ngx-ui';
import {
  LinkComponent,
  LinksComponent,
  LoginComponent,
  StatusComponent,
  RegisterComponent,
} from '@linktank/ngx-ui';

const routes: Routes = [
  { path: 'home', component: WelcomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'links',
    component: LinksComponent,
  },
  {
    path: 'link/:id',
    component: LinkComponent,
  },
  { path: 'status', component: StatusComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' }),
    NgxUiModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
