import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkComponent } from './link/link.component';
import { ReadStateComponent } from './read-state/read-state.component';
import { EditButtonComponent } from './edit-button/edit-button.component';
import { DeleteButtonComponent } from './delete-button/delete-button.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LinkComponent, ReadStateComponent, EditButtonComponent, DeleteButtonComponent],
  exports: [LinkComponent],
})
export class UiModule {}
