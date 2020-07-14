import { ApiProperty } from '@nestjs/swagger';
import { PostSummaryDto } from '../../posts/model/post-summary.dto';

export class AuthorDetailsDto {
  @ApiProperty()
  public username: string;
  @ApiProperty()
  public email: string;
  @ApiProperty()
  public firstName: string;
  @ApiProperty()
  public lastName: string;
  @ApiProperty()
  public posts: PostSummaryDto[];
}
