import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LinkComponent } from './link/link.component';
import { ReadStateComponent } from './read-state/read-state.component';
import { EditButtonComponent } from './edit-button/edit-button.component';
import { DeleteButtonComponent } from './delete-button/delete-button.component';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [
    LinkComponent,
    ReadStateComponent,
    EditButtonComponent,
    DeleteButtonComponent,
  ],
  exports: [LinkComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UiModule {}
