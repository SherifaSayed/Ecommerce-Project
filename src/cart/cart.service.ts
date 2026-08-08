import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AddToCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartRespository } from 'src/DB/Repositories';
import ProductRepository from 'src/DB/Repositories/product.repository';

@Injectable()
export class CartService {
   constructor(private readonly cartRepository:CartRespository,
    private readonly productRepository:ProductRepository
   )
   {

   }
  create(createCartDto: AddToCartDto) {
    return 'This action adds a new cart';
  }
async addToCart({body, authUser})
{
const { productId, quantity } = body;
const userId = authUser.user._id;

const product = await this.productRepository.findOneDocument({ filters: { _id: productId } });
if (!product) throw new NotFoundException('Product not found');
 if(quantity>product.stock) 
   throw new BadRequestException('Not Enough stock')

const userCart = await this.cartRepository.findOneDocument({ filters: { userId } });
if (!userCart) {
  return await this.cartRepository.creatDocument({
    userId,
    products: [{ productId, quantity, finalPrice: product.finalPrice }]
  });
  }
  const isProductAdded = userCart.products.find(product => product.productId.equals(productId))
  if(isProductAdded)
     throw new BadRequestException('Product already added to cart')
     userCart.products.push({productId, quantity, finalPrice:product.finalPrice})
     return await userCart.save();
}

  async removeFromCart({ productId, authUser }) {
  const userId = authUser.user._id;

  const product = await this.productRepository.findOneDocument({
    filters: { _id: productId }
  });

  if (!product) throw new NotFoundException('Product not found');

  const userCart = await this.cartRepository.findOneDocument({
    filters: { userId, 'products.productId': productId }
  });

  if (!userCart) throw new NotFoundException('Cart not found');

  userCart.products = userCart.products.filter(
    product => !product.productId.equals(productId)
  );

  return await userCart.save();
}
  async updateProductQuantity({ authUser, productId, quantity }) {
  const userId = authUser.user._id;

  const userCart = await this.cartRepository.findOneDocument({
    filters: { userId, 'products.productId': productId }
  });

  if (!userCart) throw new NotFoundException('Cart not found');

  const product = await this.productRepository.findOneDocument({
    filters: { _id: productId }
  });

  if (!product) throw new NotFoundException('Product not found');

  if (quantity > product.stock)
    throw new BadRequestException('Not enough stock');

  userCart.products.find(product => {
    if (product.productId.equals(productId)) {
      product.quantity = quantity;
      return product;
    }
    });

  return await userCart.save();
}

 
async getCart({ authUser }) {
  const userId = authUser.user._id;

  return await this.cartRepository.findOneDocument({
    filters: { userId },
    select: 'products subTotal'
  });
}
  // findAll() {
  //   return `This action returns all cart`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} cart`;
  // }

  // update(id: number, updateCartDto: UpdateCartDto) {
  //   return `This action updates a #${id} cart`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} cart`;
  // }
}
