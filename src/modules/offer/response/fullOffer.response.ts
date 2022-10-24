import {Expose, Type} from 'class-transformer';
import UserResponse from '../../user/response/user.response.js';
import {Location} from '../../../types/location.type.js';

export default class FullOfferResponse {
  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public type!: string;

  @Expose()
  public date!: string;

  @Expose()
  public city!: string;

  @Expose()
  public images!: string;

  @Expose()
  public previewImage!: string;

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public isFavorite!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public bedrooms!: number;

  @Expose()
  public maxAdults!: number;

  @Expose()
  public price!: number;

  @Expose()
  public goods!: number;

  @Expose()
  @Type(() => UserResponse)
  public host!: UserResponse;

  @Expose()
  public comment!: number;

  @Expose()
  public location!: Location;
}
