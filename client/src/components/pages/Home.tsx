import React, { useState, useEffect } from 'react';
import {  Link, useNavigate } from 'react-router-dom';
import { Box, Stack } from '@chakra-ui/core'
import CampaignCard from '../CampaignCard';
import EmptyState from '../EmptyState';
    
function Home():JSX.Element {
  let navigate = useNavigate()
  const [campaigns, setCampaigns] = useState<any>([]);


  useEffect(() => {
    const fetchCampaigns = async (): Promise<any> => {
      const response = await fetch(`http://localhost:5000/api/v1/campaigns`);
      const json = await response.json();
      setCampaigns(json)
    }
    fetchCampaigns();
  }, [])

    return (
        <Box
            borderTopLeftRadius={8}
            borderTopRightRadius={8}
            height="60px"
            backgroundColor="green.50"
        >
            <Link to={`/campaign/new`} className="btn btn-sm btn-outline-secondary">Create New Campaign </Link>
            <Stack
                justifyContent="center"
                alignItems="center"
                backgroundColor="green.50"
                spacing={3}
                p={8}
                borderRadius={8}
            >
                {campaigns && campaigns.map((campaign: any, i: number) => (
            
                <CampaignCard campaign={campaign} key={i}/>
            ))}
            </Stack>
        
            {!campaigns && <EmptyState/>}
        </Box>
    );
}

export default Home;