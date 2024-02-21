import { Test, TestingModule } from '@nestjs/testing';
import { BabakController } from './babak.controller';

describe('BabakController', () => {
  let controller: BabakController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BabakController],
    }).compile();

    controller = module.get<BabakController>(BabakController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
