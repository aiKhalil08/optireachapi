import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNumberString, IsString, Length, Matches, MaxLength, isNumberString } from "class-validator";

export class CreateAgentDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(65)
    email: string;

    @IsString()
    @IsNotEmpty()
    @Transform(({value}) => {
        return '+234' + value.substring(1);
    })
    @Matches(/^\+234[789][01]\d{8}$/, {message: 'Phone number is invalid'})
    phoneNumber: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/\d{11}/, {message: 'Invalid BVN'})
    bvn: string;
}
