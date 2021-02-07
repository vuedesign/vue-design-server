import { Controller, Request, Post, UnauthorizedException, Get, Body } from '@nestjs/common';
import { ApiBody, ApiTags, ApiHeader } from '@nestjs/swagger';
import { LoginBody } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import  { Public } from '../../core/decorators/auth.decorator';

@Controller('auth')
@ApiTags('用户模块')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  @Public()
  @Post('login')
  @ApiBody({
      description: '添加用户信息',
      type: LoginBody
  })
  async login(@Body() body: LoginBody) {
    const { account, password } = body;
    const data = {
      account,
      password
    };
    return this.authService.login(data);
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'auth token',
    schema: {
      default: 'default token'
    }
  })
  @Get('profile')
  getProfile(@Request() req) {
    if (!req.user || !req.user.id) {
      throw new UnauthorizedException();
    }
    return this.userService.findOne({ id: req.user.id });
  }
}
