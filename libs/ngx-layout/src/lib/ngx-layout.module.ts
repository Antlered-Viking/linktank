import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { NgxUiModule } from '@linktank/ngx-ui';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule, NgxUiModule],
  declarations: [AppLayoutComponent],
  exports: [AppLayoutComponent],
})
export class NgxLayoutModule {}
