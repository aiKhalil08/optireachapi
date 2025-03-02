import { IsString, Matches, IsNotEmpty, Validate, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from "class-validator";

@ValidatorConstraint({ name: 'passwordsMatch', async: false })
export class PasswordsMatchConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments) {
        const obj = args.object as any;
        return value === obj.password;
    }

    defaultMessage(args: ValidationArguments) {
        return `Passwords do not match`;
    }
}

export class SetPasswordDto {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,256}$/, {
        message: 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number'
    })
    password: string;

    @IsString()
    @IsNotEmpty()
    @Validate(PasswordsMatchConstraint)
    confirmPassword: string;
}