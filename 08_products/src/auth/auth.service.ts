import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/Register.dto';
import { LoginDto } from './dto/Login.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async register(dto: RegisterDto) {
    const existUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existUser) {
      throw new ConflictException('ایمیل قبلا وجود هست');
    }
    return this.prisma.user.create({
      data: dto,
      select: {
        id: true,
        name: true,
        email: true,
        createAt: true,
        updateAt: true,
      },
    });
  }
  async login(dto: LoginDto) {}
}
