import { Controller, Get, Post, Body, Patch, Param, Delete, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { AgentsService } from './agents.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { VerifyEmailDto } from './dto/verify-email-dto';
import { VerifyPhoneDto } from './dto/verify-phone-dto';
import { SetPasswordDto } from './dto/set-password.dto';
import { Public } from 'src/auth/allowPublicDecorator';

@Controller('agents')
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

    @Public()
    @Post()
    create(@Body() createAgentDto: CreateAgentDto) {
        return this.agentsService.create(createAgentDto);
    }

    @Public()
    @Post('verify-email')
    verifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
        return this.agentsService.verifyEmail(verifyEmailDto);
    }

    @Public()
    @Post('verify-phone-number')
    verifyPhoneNumber(@Body() verifyPhoneDto: VerifyPhoneDto) {
        return this.agentsService.verifyPhoneNumber(verifyPhoneDto);
    }

    @Public()
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
  @Get('transaction') 
  findAgentTransaction(@Query('agentId') agentId: string,){ 
      return this.agentsService.findAgentTransactions(agentId);
  } 

  @Get('transaction/all')
  findAllAgentTransaction(
    @Query('agentId') agentId: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number
  ){
    console.log(`API HIT: /agents/allTransaction`);
    return this.agentsService.findAllAgentTransaction(agentId, page, limit);
  }

  @Get('balance')
  findAgentBalance( @Query('agentId') agentId: string){
    return this.agentsService.findAgentBalance(agentId);
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
