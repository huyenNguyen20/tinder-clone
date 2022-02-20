import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(userData: User): Promise<void> {
    try {
      const user = new User();
      user.id = userData.id;
      user.title = userData.title;
      user.firstName = userData.firstName;
      user.lastName = userData.lastName;
      user.gender = userData.gender;
      user.email = userData.email;
      user.dateOfBirth = userData.dateOfBirth;
      user.registerDate = userData.registerDate;
      user.phone = userData.phone;
      user.picture = userData.picture;
      user.location = userData.location;
      await user.save();
    } catch (e) {
      throw e;
    }
  }
}
