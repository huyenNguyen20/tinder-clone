import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repository';
import { LikeRepository } from './repository/like.repository';
import { PassRepository } from './repository/pass.respository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, LikeRepository, PassRepository]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
