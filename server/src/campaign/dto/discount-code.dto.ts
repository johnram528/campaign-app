import { IsEmail, ValidateIf } from "class-validator";

export class DiscountCodeDTO {
    code: string;

    @IsEmail()
    @ValidateIf(e => e.recipient && e.recipient !== '')
    recipient: string;
}