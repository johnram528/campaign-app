import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CampaignDTO } from './dto/campaign.dto';
import { Campaign, CampaignDocument } from './schemas/campaign.schema';
import { DiscountCode } from './schemas/discount-code.schema';

@Injectable()
export class CampaignService {
    constructor(@InjectModel(Campaign.name) private readonly campaignModel: Model<CampaignDocument>) { }
    
    async addCampaign(campaignDTO: CampaignDTO): Promise<Campaign> {
        if(!campaignDTO.discountCodes) {
            throw new BadRequestException('Discount Codes are required!');
        }

        if(!this._isObjectValueInArrayUnique(campaignDTO.discountCodes, 'code')) {
            throw new BadRequestException('Discount Codes in a campaign must be unique!');
        }
        const newCampaign = await new this.campaignModel(campaignDTO);
        return newCampaign.save();
    }

    async getCampaign(campaignId): Promise<Campaign> {
        const Campaign = await this.campaignModel.findById(campaignId).exec();
        return Campaign;
    }

    async getCampaigns(): Promise<Campaign[]> {
        const Campaigns = await this.campaignModel.find().exec();
        return Campaigns;
    }

    async editCampaign(campaignId, campaignDTO: CampaignDTO): Promise<Campaign> {
        if(!this._isObjectValueInArrayUnique(campaignDTO.discountCodes, 'code')) {
            throw new BadRequestException('Discount Codes in a campaign must be unique!');
        }
        const editedCampaign = await this.campaignModel.findByIdAndUpdate(campaignId, CampaignDTO, { new: true});
        return editedCampaign;
    }

    async deleteCampaign(campaignId): Promise<any> {
        const deletedCampaign = await this.campaignModel.findByIdAndRemove(campaignId);
        return deletedCampaign;
    }

    async assignDiscountCode(campaignId, recipient: string): Promise<DiscountCode> { 
        const campaign = await this.campaignModel.findById(campaignId);
        
        if(!campaign) {
            throw new NotFoundException('Campaign does not exist!'); 
        }
        
        const availableDiscountCode = campaign.discountCodes.find(code => code.recipient === '');

        if(!availableDiscountCode) {
            throw new BadRequestException('There are no discount codes available for this campaign!');
        }

        const discountCodesWithNewRecipient = [
            ...campaign.discountCodes,
            {recipient: recipient}
        ];

        if(!this._isObjectValueInArrayUnique(discountCodesWithNewRecipient, "recipient")) {
            throw new BadRequestException(`A discount code for this campaign is already assigned to ${recipient}!`);
        }
        const updatedCampaign = await this.campaignModel.findOneAndUpdate({
            _id: campaignId,
            'discountCodes._id': availableDiscountCode._id
        }, 
        {
            '$set': {
                'discountCodes.$.recipient': recipient
            }
        });
        availableDiscountCode.recipient = recipient;

        return availableDiscountCode;
    }


    private _isObjectValueInArrayUnique(array: Object[], key: string): boolean {
        const uniqueValues = new Set(array.map((item, i) => item[key] !== '' ? item[key] : `empty${i}`)); // ignores '' 
        return [...uniqueValues].length === array.length;
    }

}
