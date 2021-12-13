import React from 'react'
import { Box, Heading, Stack, Text, Button } from '@chakra-ui/core'
import { useNavigate } from 'react-router-dom';

const CampaignCard = (props: any): JSX.Element => {

    let navigate = useNavigate();

    return (
        <Box
            backgroundColor="white"
            ml={0}
            mr={0}
            borderRadius={8}
            boxShadow="0px 4px 10px rgba(0, 0, 0, 0.05)"
            w="50%"
            marginBottom="5px"
        >
        <Box
            borderTopLeftRadius={8}
            borderTopRightRadius={8}
            borderBottom="1px solid"
            height="40px"
        />
        <Stack
            justifyContent="center"
            alignItems="center"
            spacing={2}
            p={16}
            borderRadius={8}
        >
            <Heading size="lg">{props.campaign.name}</Heading>
            <Text>{props.campaign.description}</Text>
            <Button onClick={()=> navigate(`/campaign/${props.campaign._id}/edit`)}>
                Edit Campaign
            </Button>
            <Button onClick={()=> navigate(`/campaign/${props.campaign._id}/view`)}>
                View Campaign
            </Button>
        </Stack>
        </Box>
    )
    
}

export default CampaignCard