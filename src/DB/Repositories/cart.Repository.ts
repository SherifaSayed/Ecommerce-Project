import { Injectable } from "@nestjs/common";
import BaseRepository from "./base.repository";
import { Cart, CartType } from "../models";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class CartRespository extends BaseRepository<CartType> {
  constructor(
    @InjectModel(Cart.name) private readonly cartModel: Model<CartType>,
  ) {
    super(cartModel);
  }
}