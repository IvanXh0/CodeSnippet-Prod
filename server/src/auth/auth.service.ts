import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async loginWithJwt(payload: any): Promise<string> {
    const accessToken = this.jwtService.sign(payload);

    console.log(accessToken)
    return accessToken
  }


}
