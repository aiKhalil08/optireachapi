import { Body, Controller, Post } from '@nestjs/common';
import { AgentsAccountService } from './agents-account.service';
import { CreateAgentAccountDto } from './dto/create-agentsAccount.dto';

@Controller('agents-account')
export class AgentsAccountController {

    constructor(private readonly agentsAccountServices: AgentsAccountService){}

    @Post()
    create(@Body() createAgentAccountDto: CreateAgentAccountDto) {
        return this.agentsAccountServices.create(createAgentAccountDto);
    }

}
