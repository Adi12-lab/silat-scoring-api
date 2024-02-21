import { Test, TestingModule } from '@nestjs/testing';
import { PertandinganController } from './pertandingan.controller';

describe('PertandinganController', () => {
  let controller: PertandinganController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PertandinganController],
    }).compile();

    controller = module.get<PertandinganController>(PertandinganController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
