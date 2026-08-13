import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CartService } from 'src/cart/cart.service';
import { OrderRespository } from 'src/DB/Repositories/order.repository';
import { OrderStatusEnum, PaymentMethodsEnum, UserDocument } from 'src/Common';
import { Types } from 'mongoose';
import { StripeService } from './Payment/Services';
import ProductRepository from 'src/DB/Repositories/product.repository';
import { CartRespository } from 'src/DB/Repositories';

@Injectable()
export class OrderService {


  constructor(private readonly cartService:CartService,
    private readonly cartRepository:CartRespository,
    private readonly orderRepository:OrderRespository,
    private readonly stripeService:StripeService,
    private readonly productRepository:ProductRepository
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


 async webhookHandler(data:any)
  {
   try
   {
    const orderId= data.data.object.metadata.orderId;
    
   const updatedOrder= await this.orderRepository.updateOne({_id:orderId},{orderStatus:OrderStatusEnum.PAID,
      orderChanges:{paidAt:Date.now()}, paymentIntent:data.data.object.payment_intent},
      [{path:'cartId',select:'products'}]
    
    );
    this.productRepository.decrementProductsStock(updatedOrder?.cartId['products'])
    this.cartRepository.updateOne(
    { _id: updatedOrder?.cartId['_id'] },
    { products: [], subTotal: 0 })

    return 'Success'
   }
   catch(error)
   {
   console.log(error);
   
   }
  }
async cancelOrderService(orderId: string, user:UserDocument) {
    const order = await this.orderRepository.findOneDocument({
        filters: {
            _id: orderId,
            userId: user._id,
            orderStatus: {
                $in: [OrderStatusEnum.PENDING,OrderStatusEnum.PLACED,OrderStatusEnum.PAID]} },
        populateArray: [{
            path: 'cartId',
            select: 'products subTotal',
            populate: [{
                path: 'products.productId',
                select: 'title finalPrice'
            }]
        }]
    })

    if (!order || !order.cartId['products'].length)
        throw new BadRequestException('Order not found')

     const timeDiff = new Date().getTime() - order['createdAt'].getTime()
     const diffInDays = timeDiff / (1000 * 60 * 60 * 24)
  if (diffInDays > 1) throw new BadRequestException('Order cannot be cancelled')

  await this.orderRepository.findOneAndUpdate(
    { _id: orderId },
    {
        orderStatus: OrderStatusEnum.CANCELLED,
        orderChanges: { cancelledAt: Date.now(), cancelledBy: user._id },
      })

    if(order.paymentMethod== PaymentMethodsEnum.CREDIT_CARD)
      {
      const refunded=  await this.stripeService.refundPaymentIntent({
          payment_intent:order.paymentIntent,
          reason:'requested_by_customer'
        })
          console.log(refunded);
    if(refunded.status=='success')
      {

        await this.orderRepository.findOneAndUpdate(
         { _id: orderId },
         {
          orderStatus: OrderStatusEnum.REFUNDED,
          orderChanges: { refundAt: Date.now(), refundBy: user._id },})}
         }
  this.productRepository.incrementProductsStock(order?.cartId['products'])
       return 'Success'
      }


 async getOrders()
 {
  return await this.orderRepository.findOneDocument({})
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
