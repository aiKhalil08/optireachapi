import { IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateAgentAccountDto {
    @IsNotEmpty()
    @IsString()
    @Matches(/\d{11}/, { message: 'Invalid BVN' })
    bvn: string;
}
