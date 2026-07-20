import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { error } from 'console';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createOrderDto: CreateOrderDto, userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new NotFoundException('کاربر وجود ندارد');
    return this.prisma.$transaction(async (tx) => {
      let totalPrice = 0;
      const valdatedItems: {
        productId: string;
        unitPrice: number;
        quantity: number;
      }[] = [];
      for (const item of createOrderDto.items) {
        const product = await tx.product.findUnique({
          where: { id: item.productId },
        });
        if (!product) throw new NotFoundException('کحصول یافت نشد');
        if (product.stock <= item.quantity)
          throw new BadRequestException('quntity out of bound');
        const unitPrice = Number(product.price);

        totalPrice += unitPrice * item.quantity;
        valdatedItems.push({
          productId: product.id,
          quantity: item.quantity,
          unitPrice,
        });
      }
      const order = await tx.order.create({
        data: { userId, toltalPrice: totalPrice },
      });
      for (const unitItem of valdatedItems) {
        await tx.orderItem.create({
          data: {
            orderId: order.id,
            productId: unitItem.productId,
            quantity: unitItem.quantity,
            unitPrice: unitItem.unitPrice,
          },
        });
        await tx.product.update({
          where: { id: unitItem.productId },
          data: {
            stock: {
              decrement: unitItem.quantity,
            },
          },
        });
      }
      return tx.order.findUnique({
        where: { id: order.id },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          items: {
            include: {
              product: true,
            },
          },
        },
      });
    });
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
// {
//   "items" :[ {"productId":"ashdkjaskas" ," quntity":2},{"productId":"ashdkjaskas" ," quntity":2},{"productId":"ashdkjaskas" ," quntity":2},{"productId":"ashdkjaskas" ," quntity":2},{"productId":"ashdkjaskas" ," quntity":2},]
// }
