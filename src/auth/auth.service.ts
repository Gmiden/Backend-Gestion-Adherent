import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ResponseDto } from 'src/user/dto/createUserDto';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOneWithUserName(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = {
      username: user.email,
      sub: {
        name: user.nomRepresentantLegal,
      },
    };
    const responseDto = new ResponseDto();
    responseDto.data = user;
    responseDto.jwt = this.jwtService.sign(payload); 

    return responseDto;
  }

  async refreshToken(user: User) {
    const payload = {
      username: user.email,
      sub: {
        name: user.nomRepresentantLegal,
      },
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
