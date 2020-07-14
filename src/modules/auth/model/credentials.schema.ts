import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsNotEmpty, MinLength } from 'class-validator';

export class CredentialsSchema {

  @ApiProperty()
  @MinLength(3)
  @IsNotEmpty()
  @IsAlphanumeric()
  username: string;

  @ApiProperty()
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}
