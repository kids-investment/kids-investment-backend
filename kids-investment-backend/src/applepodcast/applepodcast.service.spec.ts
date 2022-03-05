import { Test, TestingModule } from '@nestjs/testing';
import { ApplepodcastService } from './applepodcast.service';

describe('ApplepodcastService', () => {
  let service: ApplepodcastService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplepodcastService],
    }).compile();

    service = module.get<ApplepodcastService>(ApplepodcastService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
