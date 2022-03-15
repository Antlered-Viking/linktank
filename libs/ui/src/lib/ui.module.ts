import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LinkComponent } from './link/link.component';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [LinkComponent],
  exports: [LinkComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UiModule {}
