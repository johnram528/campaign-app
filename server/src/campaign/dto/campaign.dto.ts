import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { DiscountCode } from "../models/discount-code.interface";
import { DiscountCodeDTO } from "./discount-code.dto";

export class CampaignDTO {
    readonly name: string;
    readonly description: string;  
    @ValidateNested({ each: true })
    @Type(() => DiscountCodeDTO)
    readonly discountCodes: DiscountCode[];
}