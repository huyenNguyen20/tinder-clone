import 'jest';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UpdatePassDto } from './dto/update-like-user.dto';
import { UpdateLikeDto } from './dto/update-pass-user.dto';
import { Like } from './entities/like.entity';
import { Pass } from './entities/pass.entity';
import { User } from './entities/user.entity';
import { LikeRepository } from './repository/like.repository';
import { PassRepository } from './repository/pass.respository';
import { UserRepository } from './repository/user.repository';
import { UserService } from './user.service';

//Mock Data
const mockUpdateLikeDto = {
  userId: 'abc',
  likedUserId: 'def',
} as UpdateLikeDto;

const mockUpdatePassDto = {
  userId: 'abc',
  passedUserId: 'def',
} as UpdatePassDto;

const mockPassedList = {
  userId: 'abc',
  passedUserId: [mockUpdatePassDto.passedUserId],
  save: jest.fn(),
} as unknown as Pass;

const mockUser = {
  id: 'abc',
  save: jest.fn(),
} as unknown as User;

const mockLikedList = {
  userId: 'abc',
  likedUserId: [mockUpdateLikeDto.likedUserId],
  save: jest.fn(),
} as unknown as Like;

const mockUserRepository = {
  findOne: jest.fn(),
  createUser: jest.fn(),
  find: jest.fn(),
};

const mockLikeRepository = {
  findOne: jest.fn(),
  createLikedList: jest.fn(),
};

const mockPassRepository = {
  findOne: jest.fn(),
  createPassedList: jest.fn(),
};

let userService: UserService;

//Set up testing module
beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      UserService,
      {
        provide: UserRepository,
        useFactory: () => mockUserRepository,
      },
      {
        provide: LikeRepository,
        useFactory: () => mockLikeRepository,
      },
      {
        provide: PassRepository,
        useFactory: () => mockPassRepository,
      },
    ],
  }).compile();
  userService = module.get<UserService>(UserService);
});

afterEach(() => {
  jest.clearAllMocks();
});

//Test Suites
describe('User Controller', () => {
  it('Should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('create()', () => {
    it('Should call findOne() of userRespository', async () => {
      await userService.create(mockUser);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith(mockUser.id);
    });

    it("Should call createUser() of userRespository if user doesn't exist", async () => {
      mockUserRepository.findOne.mockResolvedValue(null);
      await userService.create(mockUser);
      expect(mockUserRepository.createUser).toHaveBeenCalledWith(mockUser);
    });

    it('Should not call createUser() of userRespository if user exists', async () => {
      mockUserRepository.findOne.mockResolvedValue(mockUser);
      await userService.create(mockUser);
      expect(mockUserRepository.createUser).not.toHaveBeenCalled();
    });
  });

  describe('findAll()', () => {
    it('Should call userRespository.find() with proper arguments', async () => {
      mockUserRepository.find.mockResolvedValue([mockUser]);
      await userService.findAll();
      expect(mockUserRepository.find).toHaveBeenCalledWith({
        select: [
          'id',
          'title',
          'firstName',
          'lastName',
          'picture',
          'dateOfBirth',
        ],
      });
    });

    it('If there is no users in the database, call fetchUsers(), then should call fetchUser for fetched users', async () => {
      mockUserRepository.find.mockResolvedValue([]);

      jest.spyOn(userService, 'fetchUsers').mockResolvedValue([mockUser]);
      jest.spyOn(userService, 'fetchUser').mockResolvedValue(mockUser);

      await userService.findAll();

      expect(userService.fetchUsers).toHaveBeenCalled();
      expect(userService.fetchUser).toHaveBeenCalledWith(mockUser.id);
    });

    it('If there is no users in the database, call fetchUsers(), then should throw error if there is no fetched user', async () => {
      mockUserRepository.find.mockResolvedValue([]);

      jest.spyOn(userService, 'fetchUsers').mockResolvedValue(null);

      expect(userService.findAll()).rejects.toEqual(
        new InternalServerErrorException(
          'Something went wrong! Please try again!',
        ),
      );
    });
  });

  describe('findOne()', () => {
    it('Should call userRespository.findOne() with proper arguments', async () => {
      mockUserRepository.findOne.mockResolvedValue(mockUser);
      const user = await userService.findOne(mockUser.id);

      expect(mockUserRepository.findOne).toHaveBeenCalledWith(mockUser.id);

      expect(user).toEqual(mockUser);
    });

    it('If userRespository.findOne() return null, should throw an exception', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      expect(userService.findOne(mockUser.id)).rejects.toEqual(
        new NotFoundException('User Not Found'),
      );
    });
  });

  describe('updateLikeUser()', () => {
    it('Should call likeRespository.findOne() with userId', async () => {
      mockLikeRepository.findOne.mockResolvedValue(mockLikedList);

      await userService.updateLikeUser(mockUpdateLikeDto);

      expect(mockLikeRepository.findOne).toHaveBeenCalledWith(
        mockUpdateLikeDto.userId,
      );
    });

    describe('If the likeRespository.findOne() return a Like List Object', () => {
      it('should not insert if the new likedUserId is already in the list', async () => {
        mockLikeRepository.findOne.mockResolvedValue(mockLikedList);

        await userService.updateLikeUser(mockUpdateLikeDto);

        expect(mockLikedList.likedUserId).toEqual(mockLikedList.likedUserId);
      });

      it('should insert if the new likedUserId is not in the list', async () => {
        const likedList = {
          userId: 'abc',
          likedUserId: [mockUpdateLikeDto.likedUserId],
          save: jest.fn(),
        } as unknown as Like;

        mockLikeRepository.findOne.mockResolvedValue(likedList);

        await userService.updateLikeUser({
          ...mockUpdateLikeDto,
          likedUserId: 'xyz',
        });
        expect(likedList.likedUserId).toEqual([
          mockUpdateLikeDto.likedUserId,
          'xyz',
        ]);
      });
    });

    describe('If the likeRespository.findOne() return null', () => {
      it('should call userRepository.findOne() and throw exception if no user is found', async () => {
        mockUserRepository.findOne.mockResolvedValue(null);
        mockLikeRepository.findOne.mockResolvedValue(null);

        expect(userService.updateLikeUser(mockUpdateLikeDto)).rejects.toEqual(
          new NotFoundException('User Not Found'),
        );
      });

      it('should call likeRepository.createLikedList() if there is an user', async () => {
        mockUserRepository.find.mockResolvedValue([]);
        mockUserRepository.findOne.mockResolvedValue(mockUser);
        mockLikeRepository.findOne.mockResolvedValue(null);
        mockLikeRepository.createLikedList.mockResolvedValue(mockLikedList);

        await userService.updateLikeUser(mockUpdateLikeDto);
        expect(mockLikeRepository.createLikedList).toHaveBeenCalled();
      });
    });
  });

  describe('updatePassUser()', () => {
    beforeEach(() => {
      mockUserRepository.find.mockResolvedValue([mockUser]);
    });

    it('Should call passRespository.findOne() with userId', async () => {
      mockUserRepository.find.mockResolvedValue([]);
      mockPassRepository.findOne.mockResolvedValue(mockPassedList);

      await userService.updatePassUser(mockUpdatePassDto);

      expect(mockPassRepository.findOne).toHaveBeenCalledWith(
        mockUpdatePassDto.userId,
      );
    });

    describe('If the passRespository.findOne() return a Pass List Object', () => {
      it('should not insert if the new passedUserId is already in the list', async () => {
        mockPassRepository.findOne.mockResolvedValue(mockPassedList);

        await userService.updatePassUser(mockUpdatePassDto);

        expect(mockPassedList.passedUserId).toEqual(
          mockPassedList.passedUserId,
        );
      });

      it('should insert if the new likedUserId is not in the list', async () => {
        const passedList = {
          userId: 'abc',
          passedUserId: [mockUpdatePassDto.passedUserId],
          save: jest.fn(),
        } as unknown as Pass;

        mockPassRepository.findOne.mockResolvedValue(passedList);

        await userService.updatePassUser({
          ...mockUpdateLikeDto,
          passedUserId: 'xyz',
        });

        expect(passedList.passedUserId).toEqual([
          mockUpdatePassDto.passedUserId,
          'xyz',
        ]);
      });
    });

    describe('If the passRespository.findOne() return null', () => {
      it('should call userRepository.findOne() and throw exception if no user is found', async () => {
        mockUserRepository.findOne.mockResolvedValue(null);
        mockPassRepository.findOne.mockResolvedValue(null);

        expect(userService.updatePassUser(mockUpdatePassDto)).rejects.toEqual(
          new NotFoundException('User Not Found'),
        );
      });

      it('should call passRepository.createPassedList() if there is an user', async () => {
        mockUserRepository.findOne.mockResolvedValue(mockUser);
        mockPassRepository.findOne.mockResolvedValue(null);
        mockPassRepository.createPassedList.mockResolvedValue(mockPassedList);

        await userService.updatePassUser(mockUpdatePassDto);
        expect(mockPassRepository.createPassedList).toHaveBeenCalled();
      });
    });
  });
});
