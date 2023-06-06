import {
  Body,
  Controller,
  Post,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
);

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post("login")
  async login(@Body("token") token: string): Promise<any> {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    console.log(ticket.getPayload());
    
    const {email, name, picture} = ticket.getPayload();

    const accessToken = await this.authService.loginWithJwt({email, name, picture});

    return {
      email,
      name,
      picture,
      message: 'success',
      accessToken
    }
  

  }
}
