import { inject, injectable } from 'inversify';
import { OfferServiceInterface } from './offer-service.interface.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { Component } from '../../types/component.types.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { DEFAULT_OFFER_COUNT, PREMIUM_OFFER_COUNT } from './offer.constant.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import { SortType } from '../../types/sort-type.enum.js';
import { CommentServiceInterface } from '../comment/comment-service.interface.js';

@injectable()
export default class OfferService implements OfferServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
    @inject(Component.CommentServiceInterface) private commentModel: CommentServiceInterface,
  ) {}

  public async find(count: number = DEFAULT_OFFER_COUNT): Promise<DocumentType<OfferEntity>[]> {
    this.logger.info('Get offer');
    const offer = this.offerModel
      .aggregate([
        {$addFields: { id: {$toString: '$_id'} }},
        {$limit: count},
        {$sort: {createdAt: SortType.Down}},
        {$project: {_id: 0, id: 1, title: 1, type: 1, date: 1, city: 1, previewImage: 1, isPremium: 1, isFavorite: 1, rating: 1, price: 1, comments: 1}}
      ]);
    return offer;
  }

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);
    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    const offer = await this.offerModel
      .aggregate([
        { $match: { $expr : { $eq: [ '$_id' , { $toObjectId: offerId }]}}},
        {$lookup: {
          from: 'users',
          localField: 'host',
          foreignField: '_id',
          pipeline: [
            {$addFields: {id: {$toString: '$_id'}}},
            {$project: {_id: 0, password: 0, createdAt: 0, updatedAt: 0, __v: 0}}
          ],
          as: 'host'
        }},
        {$unwind: '$host'},
        {$addFields: { id: {$toString: '$_id'} }},
        {$project: {id: 1, title: 1, description: 1, date: 1, city: 1, previewImage: 1, images: 1, isPremium: 1, isFavorite: 1, rating: 1, type: 1, bedrooms: 1, maxAdults: 1, price: 1, goods: 1, host: 1, comments: 1, location: 1}}
      ]);
    return offer[0];
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    this.commentModel.deleteByOfferId(offerId);
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate('host')
      .exec();
  }

  public async findPremium(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({isPremium: true})
      .sort({createdAt: SortType.Down})
      .limit(PREMIUM_OFFER_COUNT);
  }

  public async findFavorite(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({isFavorite: true})
      .sort({createdAt: SortType.Down});
  }

  public async updateFavorite(offerId: string, status: boolean): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {isFavorite: status}, {new: true})
      .select({id: 1, title: 1, type: 1, date: 1, city: 1, previewImage: 1, isPremium: 1, isFavorite: 1, rating: 1, price: 1, comments: 1})
      .exec();
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {'$inc': {comments: 1}})
      .exec();
  }
}
