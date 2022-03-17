import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LinkComponent } from './link/link.component';
import { HeaderComponent } from './header/header.component';
import { LinksComponent } from './links/links.component';
import { RouterModule } from '@angular/router';
import { StatusComponent } from './status/status.component';
import { StatusErrorComponent } from './status-error/status-error.component';

@NgModule({
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  declarations: [
    LinkComponent,
    HeaderComponent,
    LinksComponent,
    StatusComponent,
    StatusErrorComponent,
  ],
  exports: [
    LinkComponent,
    HeaderComponent,
    LinksComponent,
    StatusComponent,
    StatusErrorComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UiModule {}
