import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In } from 'typeorm';
import axios from 'axios';
import { UpdatePassDto } from './dto/update-like-user.dto';
import { UpdateLikeDto } from './dto/update-pass-user.dto';
import { User } from './entities/user.entity';
import { PreviewUser } from './user.interface';
import { UserRepository } from './repository/user.repository';
import { PassRepository } from './repository/pass.respository';
import { LikeRepository } from './repository/like.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,

    @InjectRepository(LikeRepository)
    private likeRepository: LikeRepository,

    @InjectRepository(PassRepository)
    private passRepository: PassRepository,
  ) {}
  async create(user: User): Promise<void> {
    try {
      const existingUser = await this.userRepository.findOne(user.id);
      if (!existingUser) await this.userRepository.createUser(user);
    } catch (e) {
      throw e;
    }
  }

  async findAll(): Promise<PreviewUser[]> {
    try {
      const users = await this.userRepository.find({
        select: [
          'id',
          'title',
          'firstName',
          'lastName',
          'picture',
          'dateOfBirth',
        ],
      });
      //If there is no user in DB, first fetch user list
      if (users.length === 0) {
        const previewUsers = await this.fetchUsers();
        if (!previewUsers)
          throw new InternalServerErrorException(
            'Something went wrong! Please try again!',
          );
        else {
          const fetchUsers = previewUsers.map(async (user: PreviewUser) => {
            const fullUser: User = await this.fetchUser(user.id);
            await this.create(fullUser);
            return {
              id: fullUser.id,
              title: fullUser.title,
              firstName: fullUser.firstName,
              lastName: fullUser.lastName,
              picture: fullUser.picture,
              dateOfBirth: fullUser.dateOfBirth,
            };
          });
          const results: PreviewUser[] = await Promise.all(fetchUsers);
          return results;
        }
      }
      //Else return all users on DB
      return users;
    } catch (e) {
      throw e;
    }
  }

  async findOne(id: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne(id);
      if (!user) throw new NotFoundException('User Not Found');
      return user;
    } catch (e) {
      throw e;
    }
  }

  async updateLikeUser(updateLikeUserDto: UpdateLikeDto) {
    const { userId, likedUserId } = updateLikeUserDto;
    const likedList = await this.likeRepository.findOne(userId);
    if (likedList) {
      if (!likedList.likedUserId.includes(likedUserId)) {
        likedList.likedUserId.push(likedUserId);
        await likedList.save();
      }
      return await this.userRepository.find({
        id: In([...likedList.likedUserId]),
      });
    } else {
      const user = await this.userRepository.findOne(userId);
      if (!user) throw new NotFoundException('User Not Found');
      const newLikedList = await this.likeRepository.createLikedList(
        updateLikeUserDto,
      );
      user.likeList = newLikedList;
      await user.save();
      return await this.userRepository.find({
        id: In([...newLikedList.likedUserId]),
      });
    }
  }

  async updatePassUser(updatePassUserDto: UpdatePassDto) {
    const { userId, passedUserId } = updatePassUserDto;
    const passedList = await this.passRepository.findOne(userId);
    if (passedList) {
      if (!passedList.passedUserId.includes(passedUserId)) {
        passedList.passedUserId.push(passedUserId);
        await passedList.save();
      }
      return await this.userRepository.find({
        id: In([...passedList.passedUserId]),
      });
    } else {
      const user = await this.userRepository.findOne(userId);
      if (!user) throw new NotFoundException('User Not Found');
      const newPassedList = await this.passRepository.createPassedList(
        updatePassUserDto,
      );
      user.passList = newPassedList;
      await user.save();
      return await this.userRepository.find({
        id: In([...newPassedList.passedUserId]),
      });
    }
  }

  //Helper function
  async fetchUser(id: string): Promise<User> {
    const data = await axios.get(`https://dummyapi.io/data/v1/user/${id}`, {
      headers: {
        'app-id': '6210adc8700fd7e7b9b306d8',
      },
    });
    return data.data;
  }
  async fetchUsers(): Promise<PreviewUser[]> {
    const data = await axios.get('https://dummyapi.io/data/v1/user?limit=10', {
      headers: {
        'app-id': '6210adc8700fd7e7b9b306d8',
      },
    });
    return data.data.data;
  }
}
