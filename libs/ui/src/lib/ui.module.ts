import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LinkComponent } from './link/link.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [LinkComponent, HeaderComponent],
  exports: [LinkComponent, HeaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UiModule {}
