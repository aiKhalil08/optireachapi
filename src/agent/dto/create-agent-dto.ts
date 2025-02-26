import { Transform } from "class-transformer";
import { IsString, Matches } from "class-validator";
import parsePhoneNumberFromString from "libphonenumber-js";


export class CreateAgentDto{
     @IsString()
    name?: string;
    
    @IsString()
    email: string;

    @IsString()
    @Matches(/^0[789][01]\d{8}$/, {
        message: 'Invalid phone number format',
    })
    @Transform(({ value }) => {
        const phoneNumber = parsePhoneNumberFromString(value, 'NG');
        return phoneNumber ? phoneNumber.format('E.164') : value;
    })
    phoneNumber: string

    @IsString()
    bvn: string
}