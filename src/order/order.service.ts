import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CartService } from 'src/cart/cart.service';
import { OrderRespository } from 'src/DB/Repositories/order.repository';
import { OrderStatusEnum, UserDocument } from 'src/Common';
import { Types } from 'mongoose';
import { StripeService } from './Payment/Services';

@Injectable()
export class OrderService {


  constructor(private readonly cartService:CartService,
    private readonly orderRepository:OrderRespository,
    private readonly stripeService:StripeService
  ){}
  
  async createOrderService(authUser: UserDocument, data:CreateOrderDto) {
  const cart = await this.cartService.getCart({ authUser });

  if (!cart || !cart.products.length)
    throw new BadRequestException('Cart is empty');

  const order = await this.orderRepository.createOrder({
    userId: authUser._id,
    cartId: cart._id,
    totalAmount: cart.subTotal,
    address: data.address,
    phone: data.phone,
    paymentMethod: data.paymentMethod
  });

  return order;
}

async PayWithStripe(orderId:string, user:UserDocument)
{
  const order = await this.orderRepository.findOneDocument(
    { filters: { _id: orderId, userId: user._id, orderStatus: OrderStatusEnum.PENDING },
  populateArray:[{
    path:'cartId',
    select:'products subTotal',
    populate:[{
      path:'products.productId',
      select :'title finalPrice'
    }]
  }] 
})
if (!order || !order.cartId['products'].length) throw new BadRequestException('Order not found')


const line_items = order.cartId['products'].map((product) => ({
    quantity: product.quantity,
    price_data: {
        currency: 'EGP',
        unit_amount: product.finalPrice * 100,
        product_data: {
            name: product.productId.title,
            images: ["https://res.cloudinary.com/dkdyoufcl/image/upload/v1743023686/Ecommerce_nestjs/Category/tclheq8/Prodct"]
        }
    }
}))

 const coupon = await this.stripeService.createStripeCoupon({
  name:'Test-Coupon',
  percent_off:20
    // amount_off: 100 * 100,
    // currency: 'EGP'
})

return await this.stripeService.createCheckOutSession({
    customer_email: user.email,
    metadata: { orderId: order._id.toString()},
     line_items ,
     discounts:[{coupon:coupon.id}]
    })


}
  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
