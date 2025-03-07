import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionOtp } from './entity/create-transactions-otp.entity';
import { Repository } from 'typeorm';
import { Account } from 'src/accounts/entities/account.entity';
import { Twilio } from 'twilio';

@Injectable()
export class TransactionsOtpService {
    constructor(
        @InjectRepository(TransactionOtp)
        private readonly transactionOtpRepository: Repository<TransactionOtp>,

        @InjectRepository(Account)
        private readonly accountRepository: Repository<Account>
    ){}


    private twilioClient = new Twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
    private twilioPhone = process.env.TWILIO_PHONE_NUMBER;
    
    //function to generate otp
    async generateOtp(accountNumber: string){
        const account = await this.accountRepository.findOne({
            where: {accountNumber: accountNumber},
            relations: ['customer']
        });

        if(!account){
            throw new NotFoundException('Account not found')
        }

        //getting customer's number
        const customer = account.customer;
        const phoneNumber = customer.phoneNumber;

        //generating otp
        //generating otp
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

        const otp = this.transactionOtpRepository.create({token: otpCode, expiresAt: new Date(Date.now() + 5 * 6000)})
        await this.transactionOtpRepository.save(otp)

        //sending otp via sms
        try{
            const response = await this.twilioClient.messages.create({
                body: `Your OTP is: ${otpCode}`,
                from: this.twilioPhone,
                to: phoneNumber
            });
        }catch(error){
            throw new BadRequestException(`Twilio Error: ${error.message}`);
        }
        
        return {message: "Otp sent"}
    }
}
