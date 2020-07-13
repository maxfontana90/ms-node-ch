import { IsBoolean, IsIn, MaxLength, MinLength } from 'class-validator';
import { Visibility } from "../types";

export class CreatePostDto {

  @MinLength(3)
  @MaxLength(90)
  title: string;

  @MinLength(3)
  body: string;

  @IsBoolean()
  published: boolean;

  @IsIn(['private', 'public'])
  visibility: Visibility;
}
