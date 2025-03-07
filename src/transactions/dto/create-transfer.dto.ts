import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";


export class CreateTransferDto {
    @IsString()
    @IsNotEmpty()
    @Length(10, 10)
    senderAccount: string;  // Customer sending money

    @IsString()
    @IsNotEmpty()
    @Length(10, 10)
    receiverAccount: string;  // Customer receiving money

    @IsNumber()
    @IsNotEmpty()
    amount: number;
}
