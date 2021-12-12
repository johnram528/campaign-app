import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DiscountCodeDTO } from '../dto/discount-code.dto';
import { DiscountCode, DiscountCodeSchema } from './discount-code.schema';

export type CampaignDocument = Campaign & Document;


@Schema({
    timestamps: true
})
export class Campaign {
  @Prop({
    required: true
  })
  name: string;

  @Prop()
  description: string;

  @Prop({
    required: true,
    type: [DiscountCodeSchema]
  })
  discountCodes: DiscountCode[];
}

export const CampaignSchema = SchemaFactory.createForClass(Campaign);