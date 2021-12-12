import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CampaignDTO } from './dto/campaign.dto';
import { Campaign, CampaignDocument } from './schemas/campaign.schema';

@Injectable()
export class CampaignService {
    constructor(@InjectModel(Campaign.name) private readonly campaignModel: Model<CampaignDocument>) { }
    
    async addCampaign(campaignDTO: CampaignDTO): Promise<Campaign> {
        console.log(campaignDTO);
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
        const editedCampaign = await this.campaignModel.findByIdAndUpdate(campaignId, CampaignDTO, { new: true});
        return editedCampaign;
    }

    async deleteCampaign(campaignId): Promise<any> {
        const deletedCampaign = await this.campaignModel.findByIdAndRemove(campaignId);
        return deletedCampaign;
    }

}
