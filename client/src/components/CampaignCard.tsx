import React from 'react'
import { Box, Heading, Stack, Text, Button, Flex } from '@chakra-ui/core'
import { useNavigate } from 'react-router-dom';

const CampaignCard = (props: any): JSX.Element => {

    let navigate = useNavigate();

    return (
        <Box
            backgroundColor="green.100"
            ml={0}
            mr={0}
            borderRadius={8}
            boxShadow="0px 4px 10px rgba(0, 0, 0, 0.05)"
            w="50%"
            marginBottom="15px"
        >
        <Box
            borderTopLeftRadius={8}
            borderTopRightRadius={8}
            borderBottom="1px solid green.900"
            height="40px"
            backgroundColor="green.300"
        />
        <Stack
            justifyContent="space-between"
            alignItems="center"
            spacing={5}
            p={16}
            borderRadius={8}
        >
            <Heading size="lg">{props.campaign.name}</Heading>
            <Text>{props.campaign.description}</Text>
            <Stack align="space-between" justify="space-between" padding="3" flexDirection="row" spacing={5} width="65%">
                <Button onClick={()=> navigate(`/campaign/${props.campaign._id}/edit`)}>
                    Edit Campaign
                </Button>
                <Button onClick={()=> navigate(`/campaign/${props.campaign._id}/view`)}>
                    View Campaign
                </Button>
            </Stack>
        </Stack>
        </Box>
    )
    
}

export default CampaignCard