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
import { StatusReportComponent } from './status-report/status-report.component';
import { TagsComponent } from './tags/tags.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LogoComponent } from './logo/logo.component';
import { TagIconComponent } from './tag-icon/tag-icon.component';
import { DeleteIconComponent } from './delete-icon/delete-icon.component';

@NgModule({
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  declarations: [
    LinkComponent,
    HeaderComponent,
    LinksComponent,
    StatusComponent,
    StatusErrorComponent,
    StatusReportComponent,
    TagsComponent,
    LoginComponent,
    RegisterComponent,
    WelcomeComponent,
    LogoComponent,
    TagIconComponent,
    DeleteIconComponent,
  ],
  exports: [
    LinkComponent,
    HeaderComponent,
    LinksComponent,
    StatusComponent,
    StatusErrorComponent,
    LoginComponent,
    RegisterComponent,
    WelcomeComponent,
    LogoComponent,
    TagIconComponent,
    DeleteIconComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NgxUiModule {}
