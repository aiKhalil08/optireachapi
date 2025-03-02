import { IsDateString, IsNotEmpty, IsOptional, IsString, Matches, Max, MaxLength } from "class-validator";

export class CreateAccountDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(25)
    firstName: string;

    @IsOptional()
    @IsString()
    @MaxLength(30)
    middleName: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    lastName: string;

    @IsNotEmpty()
    @Matches(/\d{11}/)
    bvn: string;

    @IsNotEmpty()
    maritalStatus: string;

    @IsNotEmpty()
    gender: string;

    @IsNotEmpty()
    @IsDateString()
    dob: string;

    @IsNotEmpty()
    @MaxLength(100)
    motherMaidenName: string;

    @IsNotEmpty()
    stateOfOrigin: string;

    @IsNotEmpty()
    lga: string;

    @IsNotEmpty()
    @Matches(/\d{11}/)
    nin: string;
}
