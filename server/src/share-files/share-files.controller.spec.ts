import { Test, TestingModule } from '@nestjs/testing';
import { ShareFilesController } from './share-files.controller';
import { ShareFilesService } from './share-files.service';

describe('ShareFilesController', () => {
  let controller: ShareFilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShareFilesController],
      providers: [ShareFilesService],
    }).compile();

    controller = module.get<ShareFilesController>(ShareFilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
