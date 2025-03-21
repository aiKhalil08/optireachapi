import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, Matches } from "class-validator";

export class VerifyPhoneDto {
    @IsString()
    @IsNotEmpty()
    @Transform(({value}) => {
        return '+234' + value.substring(1);
    })
    @Matches(/^\+234[789][01]\d{8}$/, {message: 'Phone number is invalid'})
    phoneNumber: string

    @IsString()
    @IsNotEmpty()
    @Matches(/\d{6}/)
    otp: string
}