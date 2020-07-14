import { IsEmail, IsNotEmpty, MinLength, Matches, IsAlphanumeric, IsAlpha } from 'class-validator';

export class CreateAuthorDto {
  @MinLength(3)
  @IsAlphanumeric()
  public username: string;

  @MinLength(3)
  @IsAlpha()
  public firstName: string;

  @MinLength(3)
  @IsAlpha()
  public lastName: string;

  @MinLength(8)
  @Matches(/[A-Z]+/, { message: 'Password must contain at least one uppercase letter' })
  @Matches(/[a-z]+/, { message: 'Password must contain at least one lowercase letter' })
  @Matches(/[\d]+/, { message: 'Password must contain at least one number' })
  public password: string

  @IsEmail()
  @IsNotEmpty()
  public email: string;
}
