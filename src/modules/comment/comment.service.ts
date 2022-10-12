import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Component } from '../../types/component.types.js';
import { OfferServiceInterface } from '../offer/offer-service.interface.js';
import { CommentServiceInterface } from './comment-service.interface.js';
import { CommentEntity } from './comment.entity.js';
import CreateCommentDto from './dto/create-comment.dto.js';

@injectable()
export default class CommentService implements CommentServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>,
    @inject(Component.OfferServiceInterface) private offerModel: OfferServiceInterface
  ) { }

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const result = await this.commentModel.create(dto);
    this.offerModel.incCommentCount(dto.offerId);
    this.logger.info(`New comment for offer - ${dto.offerId}`);
    return result;
  }

  public async find(offerId: string): Promise<DocumentType<CommentEntity | null>[]> {
    return await this.commentModel
      .find({ offerId })
      .populate('userId');
  }

  public async deleteByOfferId(offerId: string): Promise<void> {
    await this.commentModel
      .deleteMany({ offerId })
      .exec();
  }

  public async countRateByOfferId(offerId: string): Promise<number> {
    const rate = await this.commentModel
      .aggregate([
        { $match: { offerId: offerId } },
        {$group: {_id: null, rate: {$avg:'$rate'}}}
      ]);
    return rate[0].rate;
  }
}
