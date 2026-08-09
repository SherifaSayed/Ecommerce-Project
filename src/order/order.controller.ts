import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {UserRole } from 'src/Common';
import type {UserDocument} from '../Common'
import { Auth, User } from 'src/Common/Decorators';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  
@Post('create')
@Auth(UserRole.ADMIN)
async createOrderHandler(
  @User() authUser: UserDocument,
  @Body() data: CreateOrderDto
) {
  return await this.orderService.createOrderService(authUser, data);
}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
