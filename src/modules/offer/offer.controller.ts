import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { Controller } from '../../common/controller/controller.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Component } from '../../types/component.types.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { fillDTO } from '../../utils/common.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import OfferResponse from './response/offer.response.js';
import FullOfferResponse from './response/fullOffer.response.js';
import HttpError from '../../common/errors/http-error.js';
import CreateOfferDto from './dto/create-offer.dto.js';

@injectable()
export default class OfferController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController...');
    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: '/favorite', method: HttpMethod.Get, handler: this.findFavorite });
    this.addRoute({ path: '/favorite/:id/:status', method: HttpMethod.Get, handler: this.updateFavorite });
    this.addRoute({ path: '/:id', method: HttpMethod.Get, handler: this.findById });
    this.addRoute({ path: '/:id', method: HttpMethod.Delete, handler: this.delete });
    this.addRoute({ path: '/:id', method: HttpMethod.Patch, handler: this.update });
    this.addRoute({ path: '/premium/:city', method: HttpMethod.Get, handler: this.findPremium });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    const offersResponse = fillDTO(OfferResponse, offers);
    this.send(res, StatusCodes.OK, offersResponse);
  }

  public async findById(_req: Request, res: Response): Promise<void> {
    const offer = await this.offerService.findById(_req.params.id);
    const offersResponse = fillDTO(FullOfferResponse, offer);

    if (!offer) {
      throw new HttpError(StatusCodes.NOT_FOUND, `Offer ${_req.params.id} not found`);
    }

    this.send(res, StatusCodes.OK, offersResponse);
  }

  public async create({body}: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>, res: Response): Promise<void> {
    try {
      const offer = await this.offerService.create(body);
      const offersResponse = fillDTO(FullOfferResponse, offer);
      this.send(res, StatusCodes.CREATED, offersResponse);
    } catch (error) {
      throw new HttpError(StatusCodes.BAD_REQUEST, 'Bad data in offer');
    }
  }

  public async delete(_req: Request, res: Response): Promise<void> {
    const offer = await this.offerService.deleteById(_req.params.id);
    if(!offer) {
      throw new HttpError(StatusCodes.BAD_REQUEST, 'Not found id');
    }
    this.ok(res, StatusCodes.OK);
  }

  public async update(_req: Request, res: Response): Promise<void> {
    try {
      const offer = await this.offerService.updateById(_req.params.id, _req.body);
      const offersResponse = fillDTO(FullOfferResponse, offer);
      this.send(res, StatusCodes.CREATED, offersResponse);
    } catch (error) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Not Found Id');
    }
  }

  public async findPremium(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.findPremium(_req.params.city);
    const offersResponse = fillDTO(OfferResponse, offers);

    if(!offers.length) {
      throw new HttpError(StatusCodes.BAD_REQUEST, 'Not Found premium offers or city');
    }

    this.send(res, StatusCodes.OK, offersResponse);
  }

  public async findFavorite(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.findFavorite();
    const offersResponse = fillDTO(OfferResponse, offers);

    this.send(res, StatusCodes.OK, offersResponse);
  }

  public async updateFavorite(_req: Request, res: Response): Promise<void> {
    try {
      const offers = await this.offerService.updateFavorite(_req.params.id, !!Number(_req.params.status));
      const offersResponse = fillDTO(OfferResponse, offers);
      this.send(res, StatusCodes.OK, offersResponse);
    } catch(error) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Not Found Id');
    }

  }
}
