import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { LoginDto } from './dto/login.dto';
import { Public } from './allowPublicDecorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() loginDto: LoginDto){
        return this.authService.signIn(loginDto)
    }

    // @UseGuards(AuthGuard)
    // @Get('me')
    // getAgentInfo(){
    //     return 'I am an agent with access_token'
    // }
}
