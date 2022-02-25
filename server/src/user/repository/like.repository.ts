import { EntityRepository, Repository } from 'typeorm';
import { UpdateLikeDto } from '../dto/update-pass-user.dto';
import { Like } from '../entities/like.entity';

@EntityRepository(Like)
export class LikeRepository extends Repository<Like> {
  async createLikedList(updateLikedUserDto: UpdateLikeDto) {
    try {
      const newLikedList = new Like();
      newLikedList.userId = updateLikedUserDto.userId;
      newLikedList.likedUserId = [updateLikedUserDto.likedUserId];
      await newLikedList.save();
      return newLikedList;
    } catch (e) {
      throw e;
    }
  }
}
