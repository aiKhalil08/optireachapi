import { Transform } from "class-transformer";
import { IsEmail, Length, Matches, MaxLength } from "class-validator";

export class CreateAgentDto {
    @IsEmail()
    @MaxLength(65)
    email: string;

    @Length(11)
    @Matches(/^0[789][01]\d{8}$/)
    @Transform(({value}) => {
        return '+234' + value.substring(1);
    })
    phoneNumber: string;

    @Length(11)
    @Matches(/\d{11}/)
    bvn: string;
}
