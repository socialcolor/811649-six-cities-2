import typegoose, { defaultClasses, getModelForClass } from '@typegoose/typegoose';
// import { UserEntity } from '../user/user.entity.js';
// import { HousingOfType } from '../../types/housing-of-type.enum.js';

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
}

export const OfferModel = getModelForClass(OfferEntity);
