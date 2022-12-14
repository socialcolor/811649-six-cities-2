import {DocumentType} from '@typegoose/typegoose';
import {OfferEntity} from './offer.entity.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import UpdateOfferDto from './dto/update-offer.dto.js';

export interface OfferServiceInterface {
  find(offercount?: number): Promise<DocumentType<OfferEntity>[]>;
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  findPremium(city: string): Promise<DocumentType<OfferEntity>[]>;
  findFavorite(favorites: string[] | null): Promise<DocumentType<OfferEntity>[]>;
  updateFavorite(offerId: string,  status: boolean): Promise<DocumentType<OfferEntity> | null>;
  incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  exists(offerId: string): Promise<boolean>;
}
