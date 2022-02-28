/// <reference types="jest" />

import 'jest';
import { Test, TestingModule } from '@nestjs/testing';
import { UpdatePassDto } from './dto/update-like-user.dto';
import { UpdateLikeDto } from './dto/update-pass-user.dto';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const mockUpdateLikeDto = {} as UpdateLikeDto;
const mockUpdatePassDto = {} as UpdatePassDto;
const mockUser = {} as User;

const mockUserService = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  updateLikeUser: jest.fn(),
  updatePassUser: jest.fn(),
};

describe('User Controller', () => {
  let userController: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useFactory: () => mockUserService,
        },
      ],
    }).compile();
    userController = module.get<UserController>(UserController);
  });

  it('Should be defined', () => {
    expect(userController).toBeDefined();
  });

  it('Should call findAll() of mockUserService & return an user array', async () => {
    mockUserService.findAll.mockResolvedValue([]);

    const resp = await userController.findAll();

    expect(mockUserService.findAll).toHaveBeenCalled();
    expect(resp).toEqual([]);
  });

  it('Should call findOne() of mockUserService & return an user object', async () => {
    mockUserService.findOne.mockResolvedValue(mockUser);

    const resp = await userController.findOne('abc');

    expect(mockUserService.findOne).toHaveBeenCalledWith('abc');
    expect(resp).toEqual(mockUser);
  });

  it('Should call updateLikeUser() of mockUserService & return an user array', async () => {
    mockUserService.updateLikeUser.mockResolvedValue([mockUser]);

    const resp = await userController.updateLikedUser(mockUpdateLikeDto);

    expect(mockUserService.updateLikeUser).toHaveBeenCalledWith(
      mockUpdateLikeDto,
    );
    expect(resp).toEqual([mockUser]);
  });

  it('Should call updatePassedUser() of mockUserService & return an user array', async () => {
    mockUserService.updatePassUser.mockResolvedValue([mockUser]);

    const resp = await userController.updatePassedUser(mockUpdatePassDto);

    expect(mockUserService.updatePassUser).toHaveBeenCalledWith(
      mockUpdatePassDto,
    );
    expect(resp).toEqual([mockUser]);
  });
});
