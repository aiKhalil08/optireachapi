import { IsEnum, IsNotEmpty, IsNumber, IsString, Length } from "class-validator";


export class UtilityPaymentDto {

    @IsString()
    @IsNotEmpty()
    @Length(10, 10)
    customerAccount: string; 

    @IsNumber()
    @IsNotEmpty()
    amount: number; 

    @IsEnum(['Airtime', 'Data', 'Bills','Electricity', 'TV', 'BetWallet'])
    @IsNotEmpty()
    paymentType: 'Airtime' | 'Data' | 'Bills'| 'Electricity'| 'TV'| 'BetWallet'; // Type of utility payment

    @IsString()
    @IsNotEmpty()
    recipient: string; // Phone number or meter number
}
