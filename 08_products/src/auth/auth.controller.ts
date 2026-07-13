import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';

import { LoginDto } from './dto/Login.dto';
import { RegisterDto } from './dto/Register.dto';
import { JwtAthGurd } from './gurds/jwt-auth.gurd';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

}
