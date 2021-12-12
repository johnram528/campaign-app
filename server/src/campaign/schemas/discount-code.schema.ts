import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class DiscountCode {
  @Prop({
    required: true,
  })
  code: string;

  @Prop()
  recipient: string;

  _id?:string;
}

export const DiscountCodeSchema = SchemaFactory.createForClass(DiscountCode);