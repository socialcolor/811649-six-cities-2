import { HousingOfType } from '../types/housing-of-type.enum';
import crypto from 'crypto';

export const createOffer = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [title, description, date, city, previewImage, images, isPremium, isFavorite, rating, type, bedrooms, maxAdults, price, goods, name, email, avatarUrl, password, isPro, comments, lat, lng] = tokens;
  return {
    title,
    description,
    date,
    city,
    previewImage,
    images: images.split(';'),
    isPremium: isPremium,
    isFavorite: isFavorite,
    rating: Number(rating),
    type: type as HousingOfType,
    bedrooms: Number(bedrooms),
    maxAdults: Number(maxAdults),
    price: Number(price),
    goods: goods.split(';'),
    host: {
      name,
      email,
      avatarUrl,
      password,
      isPro: isPro,
    },
    comments: Number(comments),
    location: {
      latitude: Number(lat),
      longitude: Number(lng),
    }
  };
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';

export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};
