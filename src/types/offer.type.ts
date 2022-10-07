import { User } from './user.type';
import { Location } from './location.type';
import { HousingOfType } from './housing-of-type.enum';

export type Offer = {
  title: string;
  description: string;
  date: string;
  city: string;
  previewImage: string;
  images: string[];
  isPremium: string;
  isFavorite: string;
  rating: number;
  type: HousingOfType;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: string[];
  host: User;
  comments: number;
  location: Location
}
