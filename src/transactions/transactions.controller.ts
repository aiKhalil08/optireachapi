import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { UtilityPaymentDto } from './dto/utility-payment.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('withdraw')
  createWithdraw(
    @Body() createTransactionDto: CreateTransactionDto, 
    @Body('otp') otp: string,
    @Req() request) {
    const agentId = "550e8400-e29b-41d4-a716-446655440001"
    return this.transactionsService.createWithdraw(createTransactionDto, agentId, otp);
  }

  @Post('deposite')
  createDeposite(
    @Body() createTransactionDto: CreateTransactionDto, 
    @Body('otp') otp: string,
    @Req() request){
    const agentId = "550e8400-e29b-41d4-a716-446655440001"
    return this.transactionsService.createDeposite(createTransactionDto, agentId, otp);
  }

  @Post('transfer')
  createTransfer(
    @Body() createTransferDto: CreateTransferDto, 
    @Body('otp') otp: string,
    @Req() request){
    const agentId = "550e8400-e29b-41d4-a716-446655440001"
    return this.transactionsService.createTransfer(createTransferDto, agentId, otp);
  }

  @Post('utilities')
  createUtilities(
    @Body() utilityPaymentDto: UtilityPaymentDto, 
    @Body('otp') otp: string,
    @Req() request){
    const agentId = "550e8400-e29b-41d4-a716-446655440001"
    return this.transactionsService.createUtilities(utilityPaymentDto, agentId, otp);
  }

  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.transactionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    // return this.transactionsService.update(+id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.transactionsService.remove(+id);
  }
}
