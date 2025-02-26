import { IsString } from "class-validator"

export class AgentLoginDto{

    @IsString()
    email: string

    @IsString()
    password: string
}