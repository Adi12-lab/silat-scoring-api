import { Test, TestingModule } from '@nestjs/testing';
import { PertandinganService } from './pertandingan.service';

describe('PertandinganService', () => {
  let service: PertandinganService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PertandinganService],
    }).compile();

    service = module.get<PertandinganService>(PertandinganService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
