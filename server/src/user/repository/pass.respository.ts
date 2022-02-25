import { EntityRepository, Repository } from 'typeorm';
import { UpdatePassDto } from '../dto/update-like-user.dto';
import { Pass } from '../entities/pass.entity';

@EntityRepository(Pass)
export class PassRepository extends Repository<Pass> {
  async createPassedList(updatePassedUserDto: UpdatePassDto) {
    try {
      const newPassedList = new Pass();
      newPassedList.userId = updatePassedUserDto.userId;
      newPassedList.passedUserId = [updatePassedUserDto.passedUserId];
      await newPassedList.save();
      return newPassedList;
    } catch (e) {
      throw e;
    }
  }
}
