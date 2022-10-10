import {HousingOfType} from '../../../types/housing-of-type.enum';

export default class OfferDto {
  public id!: string;
  public title!: string;
  public type!: HousingOfType;
  public date!: string;
  public city!: string;
  public previewImage!: string;
  public isPremium!: string;
  public isFavorite!: string;
  public rating!: number;
  public price!: number;
  public comments!: number;
}
