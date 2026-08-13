import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { ProductDocument } from "src/Common";
import { Product } from "../schemas";
import BaseRepository from "./base.repository";
import { RealTimeGateway } from "src/GateWays/websocket.gateway";

@Injectable()
class ProductRepository extends BaseRepository<ProductDocument> {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
    private readonly realTimeGateway:RealTimeGateway
  ) {
    super(productModel);
  }

  async decrementProductsStock(products) {
    for (const product of products) {
        const isProductUpdated = await this.updateOne(
            { _id: product.productId },
            { $inc: { stock: -product.quantity } }
        )
        if (!isProductUpdated) continue;
        this.realTimeGateway.emitProductStockUpdate(
            product.productId,
            isProductUpdated.stock
        )
    }
}

 async incrementProductsStock(products) {
    for (const product of products) {
        const isProductUpdated = await this.updateOne(
            { _id: product.productId },
            { $inc: { stock: product.quantity } }
        )
        if (!isProductUpdated) continue;
        this.realTimeGateway.emitProductStockUpdate(
            product.productId,
            isProductUpdated.stock
        )
    }
}
}

export default ProductRepository;