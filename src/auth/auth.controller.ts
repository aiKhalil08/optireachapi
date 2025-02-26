import { Body, Controller, Get, HttpCode, HttpStatus, NotImplementedException, Post } from '@nestjs/common';
import { AgentLoginDto } from 'src/agent/dto/agent-login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    agentLogin(@Body() input: AgentLoginDto){
        return this.authService.agentLogin(input)
    }

    @Get('me')
    getAgentInfo(){
        throw new NotImplementedException
    }
}
