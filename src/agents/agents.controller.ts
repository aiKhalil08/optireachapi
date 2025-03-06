import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AgentsService } from './agents.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { VerifyEmailDto } from './dto/verify-email-dto';
import { VerifyPhoneDto } from './dto/verify-phone-dto';
import { SetPasswordDto } from './dto/set-password.dto';

@Controller('agents')
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

    @Post()
    create(@Body() createAgentDto: CreateAgentDto) {
        return this.agentsService.create(createAgentDto);
    }

    @Post('verify-email')
    verifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
        return this.agentsService.verifyEmail(verifyEmailDto);
    }

    @Post('verify-phone-number')
    verifyPhoneNumber(@Body() verifyPhoneDto: VerifyPhoneDto) {
        return this.agentsService.verifyPhoneNumber(verifyPhoneDto);
    }

    @Patch('set-password')
    setPassword(@Body() setPasswordDto: SetPasswordDto) {
        return this.agentsService.setPassword(setPasswordDto);
    }

  // @Get()
  
  // findAll() {
  //   return this.agentsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.agentsService.findOne(+id);
  // }

  //get all agent transactions
  @Get(':transactions') // Use :agentId as the route parameter
  findAgentTransaction(@Query('agentId') agentId: string) { // Access it as agentId
      return this.agentsService.findAgentTransactions(agentId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAgentDto: UpdateAgentDto) {
    return this.agentsService.update(+id, updateAgentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agentsService.remove(+id);
  }
}
