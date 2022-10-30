import {HousingOfType} from '../../../types/housing-of-type.enum.js';
import {User} from '../../../types/user.type.js';
import {Location} from '../../../types/location.type.js';
import {IsArray, IsDateString, IsEnum, IsInt, IsMongoId, Max, MaxLength, Min, MinLength, IsBoolean} from 'class-validator';
import { CityType } from '../../../types/city.enum.js';

export default class CreateOfferDto {
  @MinLength(10, {message: 'Minimum title length must be 10'})
  @MaxLength(100, {message: 'Maximum title length must be 100'})
  public title!: string;

  @MinLength(20, {message: 'Minimum description length must be 20'})
  @MaxLength(1024, {message: 'Maximum description length must be 1024'})
  public description!: string;

  @IsDateString({}, {message: 'postDate must be valid ISO date'})
  public date!: Date;

  @IsEnum(CityType, {message: 'City must be one of six'})
  public city!: string;

  @MaxLength(256, {message: 'Too short for field «image»'})
  public previewImage!: string;

  @IsArray({message: 'Field images must be an array'})
  public images!: string[];

  @IsBoolean()
  public isPremium!: boolean;

  @IsBoolean()
  public isFavorite!: boolean;

  @IsInt({message: 'rating must be an integer'})
  @Min(1, {message: 'Minimum rate length must be 1'})
  @Max(5, {message: 'Maximum rate length must be 5'})
  public rating!: number;

  @IsEnum(HousingOfType, {message: 'City must be one of six'})
  public type!: HousingOfType;

  @IsInt({message: 'bedrooms must be an integer'})
  @Min(1, {message: 'Minimum bedrooms length must be 1'})
  @Max(5, {message: 'Maximum bedrooms length must be 8'})
  public bedrooms!: number;

  @IsInt({message: 'maxAdults must be an integer'})
  @Min(1, {message: 'Minimum maxAdults length must be 1'})
  @Max(5, {message: 'Maximum maxAdults length must be 10'})
  public maxAdults!: number;

  @IsInt({message: 'Price must be an integer'})
  @Min(1, {message: 'Minimum price length must be 100'})
  @Max(5, {message: 'Maximum price length must be 100000'})
  public price!: number;

  @IsArray({message: 'Field goods must be an array'})
  public goods!: string[];

  @IsMongoId({message: 'host field must be valid an id'})
  public host!: User;

  @IsInt({message: 'comments field must be number'})
  public comments!: number;

  public location!: Location;
}
