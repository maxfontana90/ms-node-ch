import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsIn, MaxLength, MinLength } from 'class-validator';
import { Visibility } from "../types";

export class PostSchema {

  @ApiProperty()
  @MinLength(3)
  @MaxLength(90)
  title: string;

  @ApiProperty()
  @MinLength(3)
  body: string;

  @ApiProperty()
  @IsBoolean()
  published: boolean;

  @ApiProperty()
  @IsIn(['private', 'public'])
  visibility: Visibility;
}
