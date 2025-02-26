import { IsNumber, IsString } from "class-validator";


export class CreateAgentDto{
    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsString()
    bvn: string
}