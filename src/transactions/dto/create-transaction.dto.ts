import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";


export class CreateTransactionDto {
    
    @IsString()
    @IsNotEmpty()
    @Length(10,10)
    agentAccount: string;

    @IsString()
    @IsNotEmpty()
    @Length(10,10)
    customerAccount: string;

    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @IsString()
    @IsNotEmpty()
    @Length(6,6)
    otp: string;
}
