import { ApiProperty } from "@nestjs/swagger";
import { AuthorSummaryDto } from '../../authors/model/author-summary.dto';

export class PostDetailsDto {
  @ApiProperty()
  public slugid: string;
  @ApiProperty()
  public title: string;
  @ApiProperty()
  public content: string;
  @ApiProperty()
  public isPublished: boolean;
  @ApiProperty()
  public visibility: string;
  @ApiProperty()
  public publishedOn: string;
  @ApiProperty()
  public createdOn: string;
  @ApiProperty()
  public author: AuthorSummaryDto;
}
