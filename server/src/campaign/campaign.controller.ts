import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Put, Query, Res, Post } from '@nestjs/common';
import { ValidateObjectId } from 'src/shared/validate-object-id.pipes';
import { CampaignService } from './campaign.service';
import { CampaignDTO } from './dto/campaign.dto';

@Controller('api/v1')
export class CampaignController {
    constructor(private campaignService: CampaignService) {}

    @Post('/campaign')
    async addCampaign(@Res() res, @Body() campaignDTO: CampaignDTO) {
        const newCampaign = await this.campaignService.addCampaign(campaignDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Campaign has been submitted successfully!',
            campaign: newCampaign
        })
    }

    @Get('/campaign/:campaignD')
    async getCampaign(@Res() res, @Param('campaignId', new ValidateObjectId()) campaignId) {
        const campaign = await this.campaignService.getCampaign(campaignId);
        if(!campaign) {
            throw new NotFoundException('Campaign does not exist!');
        }
        return res.status(HttpStatus.OK).json(campaign);
    }

    @Get('/campaigns')
    async getCampaigns(@Res() res) {
        const campaigns = await this.campaignService.getCampaigns();

        return res.status(HttpStatus.OK).json(campaigns);
    }

    @Put('/edit')
    async editcampaign(
        @Res() res, 
        @Query('campaignId', new ValidateObjectId()) campaignId,
        @Body() campaignDTO: CampaignDTO,
    ) {
        const editedCampaign = await this.campaignService.editCampaign(campaignId, campaignDTO);
        if(!editedCampaign) {
            throw new NotFoundException('Campaign does not exist!');
        }

        return res.status(HttpStatus.OK).json({
            message: 'Campaign has been successfully updated',
            campaign: editedCampaign
        })
    }

    @Delete('/delete')
    async deleteCampaign(@Res() res, @Query('campaignId', new ValidateObjectId()) campaignId) {
        const deletedCampaign = await this.campaignService.deleteCampaign(campaignId);
        if(!deletedCampaign) {
            throw new NotFoundException('Campaign does not exist!'); 
        }

        res.status(HttpStatus.OK).json({
            message: 'Campaign has been deleted!',
            campaign: deletedCampaign
        })
    }
}
