import { Test, TestingModule } from '@nestjs/testing';
import { JuriPertandinganService } from './juri-pertandingan.service';

describe('JuriPertandinganService', () => {
  let service: JuriPertandinganService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JuriPertandinganService],
    }).compile();

    service = module.get<JuriPertandinganService>(JuriPertandinganService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
