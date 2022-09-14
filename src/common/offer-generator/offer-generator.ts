import dayjs from 'dayjs';
import { MockData } from '../../types/mock-data.type.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../utils/random.js';
import { OfferGeneratorInterface } from './offer-generator.interface.js';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

const MIN_RATING = 1;
const MAX_RATING = 5;

const MIN_BEDROOMS = 1;
const MAX_BEDROOMS = 3;

const MIN_ADULTS = 1;
const MAX_ADULTS = 4;

const MIN_PRICE = 500;
const MAX_PRICE = 2000;

const MIN_COMMENTS = 0;
const MAX_COMMENTS = 10;

const MIN_LAT = 45.500000;
const MAX_LAT = 49.500000;

const MIN_LNG = 2.900000;
const MAX_LNG = 9.900000;

export default class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockData) { }

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.title);
    const description = getRandomItem<string>(this.mockData.description);
    const data = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const city = getRandomItem<string>(this.mockData.city);
    const prevImage = getRandomItem<string>(this.mockData.previewImage);
    const images = getRandomItems<string>(this.mockData.images).join(';');
    const isPremium = getRandomItem<boolean>(this.mockData.isPremium);
    const isFavorite = getRandomItem<boolean>(this.mockData.isFavorite);
    const rating = generateRandomValue(MIN_RATING, MAX_RATING);
    const type = getRandomItem<string>(this.mockData.type);
    const bedrooms = generateRandomValue(MIN_BEDROOMS, MAX_BEDROOMS);
    const maxAdults = generateRandomValue(MIN_ADULTS, MAX_ADULTS);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE);
    const goods = getRandomItems<string>(this.mockData.goods).join(';');
    const name = getRandomItem<string>(this.mockData.host.name);
    const isPro =  getRandomItem<boolean>(this.mockData.host.isPro);
    const comments = generateRandomValue(MIN_COMMENTS, MAX_COMMENTS);
    const latitude = generateRandomValue(MIN_LAT, MAX_LAT, 6);
    const longitude = generateRandomValue(MIN_LNG, MAX_LNG, 6);

    return [
      title,
      description,
      data,
      city,
      prevImage,
      images,
      isPremium,
      isFavorite,
      rating,
      type,
      bedrooms,
      maxAdults,
      price,
      goods,
      name,
      this.mockData.host.email,
      this.mockData.host.avatarUrl,
      this.mockData.host.password,
      isPro,
      comments,
      latitude,
      longitude,
    ].join('\t');
  }
}
