import { Test, TestingModule } from '@nestjs/testing';
import { ApplepodcastController } from './applepodcast.controller';

describe('ApplepodcastController', () => {
  let controller: ApplepodcastController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplepodcastController],
    }).compile();

    controller = module.get<ApplepodcastController>(ApplepodcastController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
