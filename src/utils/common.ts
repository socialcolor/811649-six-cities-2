import * as jose from 'jose';
import {ClassConstructor, plainToInstance} from 'class-transformer';
import crypto from 'crypto';
import { HousingOfType } from '../types/housing-of-type.enum';
export const createOffer = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [title, description, date, city, previewImage, images, isPremium, isFavorite, rating, type, bedrooms, maxAdults, price, goods, name, email, avatarUrl, isPro, comments, lat, lng] = tokens;
  return {
    title,
    description,
    date: new Date(date),
    city,
    previewImage,
    images: images.split(';'),
    isPremium: !!isPremium,
    isFavorite: !!isFavorite,
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
      isPro: !!isPro,
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

export const createErrorObject = (message: string) => ({
  error: message,
});

export const fillDTO = <T, V>(someDto: ClassConstructor<T>, plainObject: V) =>
  plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});

export const createJWT = async (algoritm: string, jwtSecret: string, payload: object): Promise<string> =>
  new jose.SignJWT({...payload})
    .setProtectedHeader({ alg: algoritm})
    .setIssuedAt()
    .setExpirationTime('2d')
    .sign(crypto.createSecretKey(jwtSecret, 'utf-8'));
