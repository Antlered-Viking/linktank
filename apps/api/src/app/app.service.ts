import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData1(): { message: string } {
    return { message: 'Welcome to the Linktank API!' };
  }
}
