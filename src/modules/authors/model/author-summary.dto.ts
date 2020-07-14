import { ApiProperty } from '@nestjs/swagger';

export class AuthorSummaryDto {
  @ApiProperty()
  public username: string;
  @ApiProperty()
  public email: string;
  @ApiProperty()
  public firstName: string;
  @ApiProperty()
  public lastName: string;
}
