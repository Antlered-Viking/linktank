import { Component } from '@angular/core';
import { UserService } from '@linktank/ngx-auth';

@Component({
  selector: 'linktank-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  name: string;
  password: string;
  constructor(private user: UserService) {
    this.name = '';
    this.password = '';
  }

  async submit() {
    await this.user.login(this.name, this.password);
    this.name = '';
    this.password = '';
  }
}
