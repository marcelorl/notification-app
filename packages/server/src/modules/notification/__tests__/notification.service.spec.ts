import { Model } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { LogHistory, LogHistoryDocument } from '../entities/logHistory.entity';
import { getModelToken } from '@nestjs/mongoose';
import { NotificationService } from '../notification.service';

describe('#Notification', () => {
  let service: NotificationService;
  let mockLogHistoryModel = Model<LogHistoryDocument>;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationService,
        {
          provide: getModelToken(LogHistory.name),
          useValue: Model,
        },
      ],
    }).compile();

    service = module.get<NotificationService>(NotificationService);
    mockLogHistoryModel = module.get<Model<LogHistoryDocument>>(
      getModelToken(LogHistory.name),
    );
  });

  it('should get all the messages', async () => {
    jest.spyOn(mockLogHistoryModel, 'find').mockResolvedValueOnce(undefined);

    await service.getMessages();

    expect(mockLogHistoryModel.find).toBeCalledTimes(1);
  });

  it('should notify the sport users', async () => {
    jest
      .spyOn(mockLogHistoryModel, 'create')
      .mockResolvedValueOnce(undefined as never);

    await service.notify({
      category: 'sports',
      message: 'test',
    });

    expect(mockLogHistoryModel.create).toBeCalledTimes(1);
    expect(mockLogHistoryModel.create).toBeCalledWith({
      message: 'test',
      users: [
        {
          channels: ['sports', 'finance'],
          email: 'john@test.com',
          id: 1,
          name: 'John',
          phone: '555-1234',
          subscribed: ['sms', 'push'],
        },
        {
          channels: ['sports', 'finance', 'movies'],
          email: 'doe@test.com',
          id: 3,
          name: 'Doe',
          phone: '555-4123',
          subscribed: ['sms', 'push', 'email'],
        },
      ],
    });
  });

  it('should notify the finance users', async () => {
    jest
      .spyOn(mockLogHistoryModel, 'create')
      .mockResolvedValueOnce(undefined as never);

    await service.notify({
      category: 'finance',
      message: 'test',
    });

    expect(mockLogHistoryModel.create).toBeCalledTimes(1);
    expect(mockLogHistoryModel.create).toBeCalledWith({
      message: 'test',
      users: [
        {
          channels: ['sports', 'finance'],
          email: 'john@test.com',
          id: 1,
          name: 'John',
          phone: '555-1234',
          subscribed: ['sms', 'push'],
        },
        {
          channels: ['sports', 'finance', 'movies'],
          email: 'doe@test.com',
          id: 3,
          name: 'Doe',
          phone: '555-4123',
          subscribed: ['sms', 'push', 'email'],
        },
      ],
    });
  });

  it('should notify the movies users', async () => {
    jest
      .spyOn(mockLogHistoryModel, 'create')
      .mockResolvedValueOnce(undefined as never);

    await service.notify({
      category: 'movies',
      message: 'test',
    });

    expect(mockLogHistoryModel.create).toBeCalledTimes(1);
    expect(mockLogHistoryModel.create).toBeCalledWith({
      message: 'test',
      users: [
        {
          channels: ['movies'],
          email: 'foo@test.com',
          id: 2,
          name: 'Foo',
          phone: '555-4321',
          subscribed: ['email'],
        },
        {
          channels: ['sports', 'finance', 'movies'],
          email: 'doe@test.com',
          id: 3,
          name: 'Doe',
          phone: '555-4123',
          subscribed: ['sms', 'push', 'email'],
        },
      ],
    });
  });
});
