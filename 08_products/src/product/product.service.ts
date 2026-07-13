import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UUID } from 'crypto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createProductDto: CreateProductDto) {
    return await this.prisma.product.create({ data: createProductDto });
  }

  async findAll() {
    return await this.prisma.product.findMany({
      orderBy: {
        createAt: 'asc',
      },
    });
  }

async findOne(id: UUID) {
    const Product = await this.prisma.product.findUnique({
      where: {
        id: id,
      },
    });
    if (!Product) {
      throw new NotFoundException('محصول مورد نظر پیدا نشد');
    }
    return Product;
  }
  update(id: UUID, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: {id},
      data: updateProductDto,
    });
  }


  remove(id: UUID) {
    return this.prisma.product.delete({
      where: {
        id: id,
      },
    });
  }
}
