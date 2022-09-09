import { User } from './user.type';
import { Location } from './location.type';
import { Goods } from './goods.enum';
import { HousingOfType } from './housing-of-type.enum';

export type Offer = {
  title: string;
  description: string;
  date: string;
  city: string;
  previewImage: string;
  images: [string];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: HousingOfType;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: Goods[];
  host: User;
  comments: number;
  location: Location
}
