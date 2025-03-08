import { Body, Controller, Post } from '@nestjs/common';
import { TransactionsOtpService } from './transactions-otp.service';
import { CreateTransactionOtp } from './dto/create-transactionOtp-dto';

@Controller('transactions-otp')
export class TransactionsOtpController {
    constructor(
        private readonly transactionOtpService: TransactionsOtpService ,
    ){}

    @Post('generate')
    generateOtp(@Body() createTransactionOtp: CreateTransactionOtp){
        return this.transactionOtpService.generateOtp(createTransactionOtp);
    }

    // @Post('verify')
    // verifyOtp(@Body() verifyTransactionOtp: VerifyTransactionOtp){
    //     return this.transactionOtpService.verifyOtp(verifyTransactionOtp.agentAccount, )
    // }
}
