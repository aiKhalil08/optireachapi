import { Body, Controller, Post } from '@nestjs/common';
import { TransactionsOtpService } from './transactions-otp.service';

@Controller('transactions-otp')
export class TransactionsOtpController {
    constructor(
        private readonly transactionOtpService: TransactionsOtpService ,
    ){}

    @Post('generate')
    generateOtp(@Body('accountNumber') accountNumber: string,){
        return this.transactionOtpService.generateOtp(accountNumber);
    }

    @Post('verify')
    verifyOtp(@Body('otp') otp: string){
        return this.transactionOtpService.verifyOtp(otp)
    }
}
