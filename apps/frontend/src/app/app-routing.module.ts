import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UiModule } from '@linktank/ui';
import { LinkComponent } from '@linktank/ui';

const routes: Routes = [
  { path: 'home', component: AppComponent },
  {
    path: 'link',
    component: LinkComponent,
    children: [
      {
        path: 'link/:id',
        component: LinkComponent,
      },
    ],
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), UiModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
