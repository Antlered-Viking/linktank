import { LinksHealthIndicator, LinksModule } from '@linktank/links';
import { UsersHealthIndicator, UsersModule } from '@linktank/users';
import { TerminusModule } from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';
import { CheckController } from './check.controller';

describe('CheckController', () => {
  let controller: CheckController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TerminusModule, LinksModule, UsersModule],
      controllers: [CheckController],
      providers: [LinksHealthIndicator, UsersHealthIndicator],
    }).compile();

    controller = module.get<CheckController>(CheckController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
