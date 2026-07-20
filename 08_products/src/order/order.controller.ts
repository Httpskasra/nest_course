import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtAthGurd } from 'src/auth/gurds/jwt-auth.guard';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAthGurd)
  @Post()
  create(
    @Body() createOrderDto: CreateOrderDto,
    @CurrentUser('sub') userId: string,
  ) {
    return this.orderService.create(createOrderDto, userId);
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
  update(@Param('id') id: string) {
    return this.orderService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
