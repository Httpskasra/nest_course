import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UUID } from 'crypto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const existUser = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });
    if (existUser) {
      throw new ConflictException('این ایمیل وجود دارد');
    }
    return await this.prisma.user.create({ data: createUserDto });
  }

  async findAll() {
    return await this.prisma.user.findMany({
      orderBy: {
        name: 'asc',
      },
      select: {
        id: false,
        name: true,
        email: true,
        createAt: false,
        updateAt: false,
      },
    });
  }

  async findOne(id: UUID) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new NotFoundException('کاربر مورد نظر پیدا نشد');
    }
    return user;
  }

  update(id: UUID, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: {id},
      data: updateUserDto,
    });
  }

  remove(id: UUID) {
    return this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
