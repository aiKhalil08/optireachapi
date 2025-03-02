import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class VerifyEmailDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    @Matches(/\d{6}/)
    otp: string
}