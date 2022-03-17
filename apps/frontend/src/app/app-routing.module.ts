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
  },
  {
    path: 'link/:id',
    component: LinkComponent,
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' }),
    UiModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
