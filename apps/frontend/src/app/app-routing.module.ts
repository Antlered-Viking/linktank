import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UiModule } from '@linktank/ui';
import { LinkComponent, LinksComponent } from '@linktank/ui';

const routes: Routes = [
  { path: 'home', component: AppComponent },
  {
    path: 'links',
    component: LinksComponent,
    children: [
      {
        path: 'links/:id',
        component: LinkComponent,
      },
    ],
  },
  { path: '', redirectTo: '/links', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), UiModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
