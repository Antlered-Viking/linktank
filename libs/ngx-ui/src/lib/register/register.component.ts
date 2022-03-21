import { Component } from '@angular/core';
import { UserService } from '@linktank/ngx-auth';

@Component({
  selector: 'linktank-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  name: string;
  password: string;
  constructor(private user: UserService) {
    this.name = '';
    this.password = '';
  }

  async submit() {
    await this.user.register(this.name, this.password);
    this.name = '';
    this.password = '';
  }
}
