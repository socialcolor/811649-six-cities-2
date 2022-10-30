import { Expose } from 'class-transformer';

export default class CommentResponse {
  @Expose()
  public id!: string;

  @Expose()
  public text!: string;

  @Expose()
  public rate!: number;

  @Expose()
  public userId!: string;

  @Expose()
  public offerId!: string;
}
