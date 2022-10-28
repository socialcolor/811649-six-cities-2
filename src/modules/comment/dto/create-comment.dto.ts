import { IsMongoId, IsString, Length } from 'class-validator';

export default class CreateCommentDto {
  @IsString({message: 'text is required'})
  @Length(5, 1024, {message: 'Min length is 5, max is 1024'})
  public text!: string;

  @Length(1, 5, {message: 'Min length is 1, max is 5'})
  public rate!: number;

  @IsMongoId()
  public userId!: string;

  @IsMongoId()
  public offerId!: string;
}
