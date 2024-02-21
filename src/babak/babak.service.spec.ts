import { Test, TestingModule } from '@nestjs/testing';
import { BabakService } from './babak.service';

describe('BabakService', () => {
  let service: BabakService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BabakService],
    }).compile();

    service = module.get<BabakService>(BabakService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
