import { readFileSync } from 'fs';
import { Offer } from '../../types/offer.type.js';
import { FileReaderInterface } from './file-reader.interface.js';
import { HousingOfType } from '../../types/housing-of-type.enum';
export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) { }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([title, description, date, city, previewImage, images, isPremium, isFavorite, rating, type, bedrooms, maxAdults, price, goods, name, email, avatarUrl, password, isPro, comments, lat, lng]) => (
        {
          title,
          description,
          date,
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
            password,
            isPro: !!isPro,
          },
          comments: Number(comments),
          location: {
            latitude: Number(lat),
            longitude: Number(lng),
          }
        }
      ));
  }
}
