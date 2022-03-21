import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to the Linktank API!"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.welcome1()).toEqual({
        message: 'Welcome to the Linktank API!',
      });
    });
  });
});
