import { Test, TestingModule } from '@nestjs/testing';
import { PesertaController } from './peserta.controller';

describe('PesertaController', () => {
  let controller: PesertaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PesertaController],
    }).compile();

    controller = module.get<PesertaController>(PesertaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
