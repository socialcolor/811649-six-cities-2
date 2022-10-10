import typegoose, { defaultClasses, getModelForClass, Ref } from '@typegoose/typegoose';
import { HousingOfType } from '../../types/housing-of-type.enum.js';
// import { User } from '../../types/user.type.js';
import { UserEntity } from '../user/user.entity.js';
const { prop, modelOptions } = typegoose;

export interface OfferEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public title!: string;

  @prop({ trim: true })
  public description!: string;

  @prop()
  public date!: string;

  @prop()
  public city!: string;

  @prop()
  public previewImage!: string;

  @prop({images: () => Array})
  public images!: string[];

  @prop()
  public isPremium!: string;

  @prop()
  public isFavorite!: string;

  @prop()
  public rating!: number;

  @prop({
    type: () => String,
    enum: HousingOfType,
  })
  public type!: HousingOfType;

  @prop()
  public bedrooms!: number;

  @prop()
  public maxAdults!: number;

  @prop({ required: true })
  public price!: number;

  @prop({
    goods: () => Array
  })
  public goods!: string[];

  @prop({
    ref: UserEntity,
    required: true,
    _id: false,
  })
  public host!: Ref<UserEntity>;

  @prop()
  public comments!: number;
}

export const OfferModel = getModelForClass(OfferEntity);
