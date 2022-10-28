import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { Controller } from '../../common/controller/controller.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { DocumentExistsMiddleware } from '../../common/middlewares/document-exists.middleware.js';
import { ValidateDtoMiddleware } from '../../common/middlewares/validate-dto.middleware.js';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validate-objectid.middleware.js';
import { Component } from '../../types/component.types.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { fillDTO } from '../../utils/common.js';
import { OfferServiceInterface } from '../offer/offer-service.interface.js';
import { CommentServiceInterface } from './comment-service.interface.js';
import CreateCommentDto from './dto/create-comment.dto.js';
import CommentResponse from './response/comment.response.js';

@injectable()
export default class CommentController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.CommentServiceInterface) private readonly commentService: CommentServiceInterface,
    @inject(Component.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
  ) {
    super(logger);
    this.logger.info('Register routes for CommentController...');
    this.addRoute({path: ':offerId', method: HttpMethod.Get, handler: this.index, middlewares: [new ValidateObjectIdMiddleware('offerId'), new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')]});
    this.addRoute({path: ':offerId', method: HttpMethod.Post, handler: this.create, middlewares: [new ValidateObjectIdMiddleware('offerId'), new ValidateDtoMiddleware(CreateCommentDto), new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')]});
  }

  public async index(req: Request, res: Response): Promise<void> {
    const comments = await this.commentService.find(req.params.offerId);
    const commentsResponse = fillDTO(CommentResponse, comments);
    this.ok(res, commentsResponse);
  }

  public async create({body}: Request<Record<string, unknown>, Record<string, unknown>>, res: Response): Promise<void> {
    const comment = await this.commentService.create(body);
    const commentResponse = fillDTO(CommentResponse, comment);
    this.ok(res, commentResponse);
  }
}
