import { BadRequestException } from "@nestjs/common";
import { Transform } from "class-transformer";
import { IsOptional, IsString, Matches } from "class-validator";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export class CreateAgentDto{
    
    @IsOptional()
    @IsString()
    name?: string;
    
    @IsString()
    email: string;

    @IsString()
    @Transform(({ value }) => {
        console.log("Raw input before transformation:", value); // Debugging
        value = value.trim(); // Remove extra spaces

        // validate manually before transforming
        if (!/^0?[789][01]\d{8}$/.test(value)) {
            throw new BadRequestException("Invalid phone number format");
        }

        // If it starts with "0", remove it
        if (value.startsWith("0")) {
            value = value.slice(1); 
        }
        const phoneNumber = parsePhoneNumberFromString(value, 'NG');
        return phoneNumber ? phoneNumber.format('E.164') : value;
    })
    phoneNumber: string

    @IsString()
    bvn: string
}