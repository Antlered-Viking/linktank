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
import { PinPadComponent } from './pin-pad/pin-pad.component';
import { AuthPanelComponent } from './auth-panel/auth-panel.component';
import { NgxIconsModule } from '@linktank-ngx-icons';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    NgxIconsModule,
  ],
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
    PinPadComponent,
    AuthPanelComponent,
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
    PinPadComponent,
    AuthPanelComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NgxUiModule {}
