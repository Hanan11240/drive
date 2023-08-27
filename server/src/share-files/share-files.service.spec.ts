import { Test, TestingModule } from '@nestjs/testing';
import { ShareFilesService } from './share-files.service';

describe('ShareFilesService', () => {
  let service: ShareFilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShareFilesService],
    }).compile();

    service = module.get<ShareFilesService>(ShareFilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
