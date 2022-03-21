import { Test } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getData', () => {
    it('should return "Welcome to the Linktank API!"', () => {
      expect(service.getData1()).toEqual({
        message: 'Welcome to the Linktank API!',
      });
    });
  });
});
