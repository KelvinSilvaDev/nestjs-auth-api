import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({ description: 'Refresh token do usuário' })
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
