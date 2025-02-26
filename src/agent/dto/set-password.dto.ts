import { IsString } from "class-validator";

export class SetPasswordDto{
    @IsString()
    email: string;
    
    @IsString()
    password: string
}