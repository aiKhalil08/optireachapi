import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateAgentDto } from './dto/create-agent-dto';
import { AgentService } from './agent.service';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { SetPasswordDto } from './dto/set-password.dto';
import { AgentLoginDto } from './dto/agent-login.dto';

@Controller('agent')
export class AgentController {

    constructor(private readonly agentService: AgentService){}
    //route to register an agent
    @Post('register')
    createAgent(@Body() input: CreateAgentDto){
        return this.agentService.createAgent(input)
    }

    //route to verify otp
    @Post('verify-otp')
    confirmOtp(@Body() input: VerifyOtpDto){
        return this.agentService.confirmOtp(input)
    }

    //route to set password
    @Post('set-password')
    setPasword(@Body() input: SetPasswordDto){
        return this.agentService.setPasword(input)
    }

    //to get all users
    @Get()
    findAll(){
        return this.agentService.findAll()
    }

    //to login as an agent
    @Post('login')
    agentLogin(@Body() input: AgentLoginDto){
        return this.agentService.agentLogin(input)
    }


}
