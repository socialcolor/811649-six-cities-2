import typegoose, { defaultClasses, getModelForClass, Ref } from '@typegoose/typegoose';
import { HousingOfType } from '../../types/housing-of-type.enum.js';
import { Location } from '../../types/location.type.js';
import { UserEntity } from '../user/user.entity.js';
const { prop, modelOptions } = typegoose;

export interface OfferEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  },
  options: {
    allowMixed: 0,
  }
})
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public title!: string;

  @prop({ trim: true, required: true })
  public description!: string;

  @prop({required: true})
  public date!: string;

  @prop({required: true})
  public city!: string;

  @prop({required: true})
  public previewImage!: string;

  @prop({images: () => Array, required: true})
  public images!: string[];

  @prop({required: true})
  public isPremium!: boolean;

  @prop({required: true})
  public isFavorite!: boolean;

  @prop({required: true})
  public rating!: number;

  @prop({
    type: () => String,
    enum: HousingOfType,
    required: true
  })
  public type!: HousingOfType;

  @prop({required: true})
  public bedrooms!: number;

  @prop({required: true})
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

  @prop({
    required: true,
  })
  public location!: Location;
}

export const OfferModel = getModelForClass(OfferEntity);
