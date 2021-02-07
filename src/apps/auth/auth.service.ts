import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginParam } from './dto/auth.dto';
import isEmail from 'validator/lib/isEmail';
import isNumeric from 'validator/lib/isNumeric';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(formData: LoginParam): Promise<any> {
    const { password, account } = formData;
    let field: string = '';
    if (isNumeric(account)) {
      field = 'phone';
    } else if (isEmail(account)) {
      field = 'email';
    } else {
      field = 'username';
    }
    const where = {
      [field]: account
    };
    console.log('where', where);
    const user = await this.userService.findOne(where);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginData: LoginParam) {
    const user = await this.validateUser(loginData);
    console.log('user', user);
    const payload = { username: user.username, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
