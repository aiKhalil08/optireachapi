import { IsNotEmpty, IsString, Length } from "class-validator";


export class CreateTransactionOtp{
    @IsString()
    @IsNotEmpty()
    @Length(10,10)
    accountNumber: string;
}