import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CartService } from 'src/cart/cart.service';
import { OrderRespository } from 'src/DB/Repositories/order.repository';
import { UserDocument } from 'src/Common';

@Injectable()
export class OrderService {


  constructor(private readonly cartService:CartService,
    private readonly orderRepository:OrderRespository
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
