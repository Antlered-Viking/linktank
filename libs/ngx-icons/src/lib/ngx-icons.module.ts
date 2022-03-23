import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './logo/logo.component';
import { TagIconComponent } from './tag-icon/tag-icon.component';
import { DeleteIconComponent } from './delete-icon/delete-icon.component';
import { UndoIconComponent } from './undo-icon/undo-icon.component';
import { CheckIconComponent } from './check-icon/check-icon.component';
import { EyeIconComponent } from './eye-icon/eye-icon.component';
import { EditIconComponent } from './edit-icon/edit-icon.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    LogoComponent,
    TagIconComponent,
    DeleteIconComponent,
    UndoIconComponent,
    CheckIconComponent,
    EyeIconComponent,
    EditIconComponent,
  ],
  exports: [
    LogoComponent,
    TagIconComponent,
    DeleteIconComponent,
    UndoIconComponent,
    CheckIconComponent,
    EyeIconComponent,
    EditIconComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NgxIconsModule {}
