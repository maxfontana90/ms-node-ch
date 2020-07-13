import { IsAlphanumeric, IsNotEmpty, MinLength } from 'class-validator';

export class CredentialsDto {

  @MinLength(3)
  @IsNotEmpty()
  @IsAlphanumeric()
  username: string;

  @MinLength(8)
  @IsNotEmpty()
  password: string;
}
