import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdatePassDto {
    @ApiProperty({ example: '60d0fe4f5311236168a109cb', description: 'User Id' })
    @IsString()
    userId: string;

    @ApiProperty({ example: '60d0fe4f5311236168a109cb', description: 'Liked User Id' })
    @IsString()
    passedUserId: string;
}
