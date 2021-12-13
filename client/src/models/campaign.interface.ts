export interface DiscountCode {
    code: string;
    recipient: string;
} 

export interface Campaign  {
    _id: string,
    name: string;
    description: string;
    discountCodes: DiscountCode[];
 }