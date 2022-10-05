import {HousingOfType} from '../../../types/housing-of-type.enum';
import {User} from '../../../types/user.type';
import {Location} from '../../../types/location.type';

export default class CreateOfferDto {
  public title!: string;
  public description!: string;
  public date!: string;
  public city!: string;
  public previewImage!: string;
  public images!: string[];
  public isPremium!: string;
  public isFavorite!: string;
  public rating!: number;
  public type!: HousingOfType;
  public bedrooms!: number;
  public maxAdults!: number;
  public price!: number;
  public goods!: string[];
  public host!: User;
  public comments!: number;
  public location!: Location;
}
