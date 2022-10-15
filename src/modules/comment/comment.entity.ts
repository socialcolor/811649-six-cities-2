import typegoose, { defaultClasses, getModelForClass } from '@typegoose/typegoose';
import { OfferEntity } from '../offer/offer.entity.js';
import { UserEntity } from '../user/user.entity.js';
const { prop, modelOptions } = typegoose;

export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments'
  }
})
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({required: true})
  public text!: string;

  @prop({required: true})
  public rate!: number;

  @prop({required: true, ref: UserEntity, _id: false})
  public userId!: string;

  @prop({required: true, ref: OfferEntity, _id: false})
  public offerId!: string;
}

export const CommentModel = getModelForClass(CommentEntity);
