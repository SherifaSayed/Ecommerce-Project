import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Auth, User } from 'src/Common/Decorators';
import { UserRole } from 'src/Common';
import type {UserDocument} from '../Common'

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add-to-cart')
   
  
  @Post('add-to-cart')
  @Auth(UserRole.USER)
  async addToCart(
    @Body() body: AddToCartDto,
    @User() authUser: UserDocument
  ) {

    const result = await this.cartService.addToCart({ body, authUser })
     return { result }
  }


@Patch('remove-from-cart/:productId')
@Auth('user')
async removeFromCart(
  @Param('productId') productId: string,
   @User() authUser: UserDocument
) {
  const result = await this.cartService.removeFromCart({ productId, authUser })
  return { result }
}



  @Post()
  create(@Body() createCartDto: AddToCartDto) {
    return this.cartService.create(createCartDto);
  }

  // @Get()
  // findAll() {
  //   return this.cartService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.cartService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
  //   return this.cartService.update(+id, updateCartDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.cartService.remove(+id);
  // }
}
