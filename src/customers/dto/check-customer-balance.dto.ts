import { IsNotEmpty, IsString, Length } from "class-validator";


export class CheckCustomerBalance{
    @IsString()
    @IsNotEmpty()
    @Length(10,10)
    accountNumber: string;

    @IsString()
    @IsNotEmpty()
    @Length(6,6)
    otp: string;
}