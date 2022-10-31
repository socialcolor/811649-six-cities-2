import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { Controller } from '../../common/controller/controller.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Component } from '../../types/component.types.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { fillDTO } from '../../utils/common.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import { UserServiceInterface } from '../user/user-service.interface.js';
import OfferResponse from './response/offer.response.js';
import FullOfferResponse from './response/fullOffer.response.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validate-objectid.middleware.js';
import { ValidateDtoMiddleware } from '../../common/middlewares/validate-dto.middleware.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import { DocumentExistsMiddleware } from '../../common/middlewares/document-exists.middleware.js';
import { PrivateRouteMiddleware } from '../../common/middlewares/private-route.middleware.js';

@injectable()
export default class OfferController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
    @inject(Component.UserServiceInterface) private readonly userService: UserServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController...');
    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create, middlewares: [new PrivateRouteMiddleware(), new ValidateDtoMiddleware(CreateOfferDto)] });
    this.addRoute({ path: '/favorite', method: HttpMethod.Get, handler: this.findFavorite, middlewares: [new PrivateRouteMiddleware()]});
    this.addRoute({ path: '/favorite/:id/:status', method: HttpMethod.Get, handler: this.updateFavorite, middlewares: [new PrivateRouteMiddleware(), new ValidateObjectIdMiddleware('id'), new DocumentExistsMiddleware(this.offerService, 'Offer', 'id')] });
    this.addRoute({ path: '/:id', method: HttpMethod.Get, handler: this.findById, middlewares: [new ValidateObjectIdMiddleware('id'), new DocumentExistsMiddleware(this.offerService, 'Offer', 'id')] });
    this.addRoute({ path: '/:id', method: HttpMethod.Delete, handler: this.delete, middlewares: [new PrivateRouteMiddleware(), new ValidateObjectIdMiddleware('id'), new DocumentExistsMiddleware(this.offerService, 'Offer', 'id')] });
    this.addRoute({ path: '/:id', method: HttpMethod.Patch, handler: this.update, middlewares: [new PrivateRouteMiddleware(), new ValidateObjectIdMiddleware('id'), new ValidateDtoMiddleware(UpdateOfferDto), new DocumentExistsMiddleware(this.offerService, 'Offer', 'id')] });
    this.addRoute({ path: '/premium/:city', method: HttpMethod.Get, handler: this.findPremium });
  }

  public async index(req: Request, res: Response): Promise<void> {
    let offers = null;
    if(req.user) {
      offers = await this.offerService.find();
      const favorites = await this.userService.findFavorites(req.user.id);
      offers.map((offer) => {
        if(favorites) {
          offer.isFavorite = favorites.includes(offer.id);
        }
      });
    } else {
      offers = await this.offerService.find();
    }
    const offersResponse = fillDTO(OfferResponse, offers);
    this.send(res, StatusCodes.OK, offersResponse);
  }

  public async findById(req: Request, res: Response): Promise<void> {
    let offer = null;
    if(req.user) {
      offer = await this.offerService.findById(req.params.id);
      const favorites = await this.userService.findFavorites(req.user.id);
      if(offer && favorites) {
        offer.isFavorite = favorites.includes(offer.id);
      }
    } else {
      offer = await this.offerService.findById(req.params.id);
    }
    const offersResponse = fillDTO(FullOfferResponse, offer);
    this.send(res, StatusCodes.OK, offersResponse);
  }

  public async create(req: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>, res: Response): Promise<void> {
    const {body, user} = req;
    const offer = await this.offerService.create({...body, host: user});
    const offersResponse = fillDTO(FullOfferResponse, offer);
    this.send(res, StatusCodes.CREATED, offersResponse);
  }

  public async delete(req: Request, res: Response): Promise<void> {
    await this.offerService.deleteById(req.params.id);
    this.ok(res, StatusCodes.OK);
  }

  public async update(req: Request, res: Response): Promise<void> {
    const offer = await this.offerService.updateById(req.params.id, req.body);
    const offersResponse = fillDTO(FullOfferResponse, offer);
    this.send(res, StatusCodes.CREATED, offersResponse);
  }

  public async findPremium(req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.findPremium(req.params.city);
    const offersResponse = fillDTO(OfferResponse, offers);
    this.send(res, StatusCodes.OK, offersResponse);
  }

  public async findFavorite(req: Request, res: Response): Promise<void> {
    const offers = await this.userService.findFavorites(req.user.email);
    const offersResponse = fillDTO(OfferResponse, offers);
    this.send(res, StatusCodes.OK, offersResponse);
  }

  public async updateFavorite(req: Request, res: Response): Promise<void> {
    await this.userService.updateFavorite(req.user.email, req.params.id, !!Number(req.params.status));
    this.ok(res, StatusCodes.OK);
  }

}
