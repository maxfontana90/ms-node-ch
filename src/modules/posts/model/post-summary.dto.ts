import { ApiProperty } from "@nestjs/swagger";

export class PostSummaryDto {
  @ApiProperty()
  public slugid: string;
  @ApiProperty()
  public title: string;
  @ApiProperty()
  public isPublished: boolean;
  @ApiProperty()
  public visibility: string;
  @ApiProperty()
  public publishedOn: string;
  @ApiProperty()
  public createdOn: string;
}
