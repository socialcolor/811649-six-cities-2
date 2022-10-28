import { IsInt, IsMongoId, IsString, Length, Max, Min } from 'class-validator';

export default class CreateCommentDto {
  @IsString({message: 'text is required'})
  @Length(5, 1024, {message: 'Min length is 5, max is 1024'})
  public text!: string;

  @IsInt({message: 'Rate must be an integer'})
  @Min(1, {message: 'Minimum rate is 1'})
  @Max(5, {message: 'Maximum rate is 5'})
  public rate!: number;

  @IsMongoId()
  public userId!: string;

  @IsMongoId()
  public offerId!: string;
}
