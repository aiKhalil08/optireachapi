import { Body, Controller, Get, HttpCode, HttpStatus, NotImplementedException, Post, UseGuards } from '@nestjs/common';
import { AgentLoginDto } from 'src/agent/dto/agent-login.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    agentLogin(@Body() input: AgentLoginDto){
        return this.authService.agentLogin(input)
    }

    @UseGuards(AuthGuard)
    @Get('me')
    getAgentInfo(){
        return 'I am an agent with access_token'
    }
}
