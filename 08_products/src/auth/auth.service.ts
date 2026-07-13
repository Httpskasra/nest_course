import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/Register.dto';
import { LoginDto } from './dto/Login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JWTPayload } from './decorators/current-user.decorator';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async register(dto: RegisterDto) {
    const existUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existUser) {
      throw new ConflictException('ایمیل قبلا وجود هست');
    }
    const passworHash = await bcrypt.hash(dto.password, 12);
    return this.prisma.user.create({
      data: { ...dto, password: passworHash },
      select: {
        id: true,
        name: true,
        email: true,
        createAt: true,
        updateAt: true,
      },
    });
  }
  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) {
      throw new UnauthorizedException('ورود نامعتبر');
    }

    const isValid = await bcrypt.compare(dto.password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('رمز نامعتبر');
    }
    const payload: JWTPayload = {
      sub: user.id,
      email: user.email,
    };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
