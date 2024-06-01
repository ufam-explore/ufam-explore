import { Public } from '@common/decorators/auth.decorator';
import { AuthService } from '@modules/auth/auth.service';
import { LoginResponse } from '@modules/auth/dto/login-response.dto';
import { LoginDto } from '@modules/auth/dto/login.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller()
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: LoginResponse })
  @ApiOperation({ summary: 'Login' })
  login(@Body() { email, password }: LoginDto) {
    return this.authService.login(email, password);
  }

  @Get('hello')
  @Public()
  getHello() {
    return 'Hello';
  }
}
