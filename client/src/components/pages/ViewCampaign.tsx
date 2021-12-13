import React, { useState, useEffect } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
import {  Box, Button, Flex, FormControl, FormLabel, Heading, Input, Stack, useToast } from '@chakra-ui/core'
import { Campaign } from '../../models/campaign.interface';
    
function ViewComponent():JSX.Element {
  let navigate = useNavigate()
  const [campaign, setCampaign] = useState<Campaign>();
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false)
  const [loading, setLoading] = useState(false);
  const [discountCode, setDiscountCode] = useState(false);
  const [email, setEmail] = useState('')

  let { campaignId } = useParams();


  useEffect(() => {
    const fetchCampaign = async (): Promise<any> => {
      const response = await fetch(`http://localhost:5000/api/v1/campaign/${campaignId}`);
      const json = await response.json();
      setCampaign(json)
    }
    fetchCampaign();
  }, [campaignId])

  const toast = useToast();

  const handleFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    const submitSuccess: boolean = await submitForm();
    setSubmitSuccess(submitSuccess);
    setLoading(false);

  }

  const submitForm = async (): Promise<boolean> => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/campaign/${campaignId}/assign`, {
        method: "put",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
        }),
        body: JSON.stringify({recipient: email})
      });
      const json = await response.json();
      console.log(json)
      if (!response.ok) {
        const message = `An error has occured: ${json.message}`;
        throw new Error(message);
      }
      setDiscountCode(json.discountCode.code)
      toast({
        title: "Success!",
        description: 'Your discount code has been claimed.',
        status: "success",
        duration: 9000,
        isClosable: true,
      })
      return response.ok;
    } catch(err: any) {
        toast({
            title: "Request Failed.",
            description: err.message,
            status: "error",
            duration: 9000,
            isClosable: true,
        })
        return false;
    }
  }


  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
  }
  

    return (
    <Flex justify="center">
        <Box p={4} display={{ md: 'flex' }}>
          <form onSubmit={handleFormSubmission}>
            <Stack spacing={3}>
              <Heading>{campaign?.name}</Heading>
              {!submitSuccess && (
                  <Box>
                    <Heading as="h3" size="lg">
                        Enter your email address to receive a unique promo code.
                    </Heading>

                    <FormControl>
                        <FormLabel htmlFor="name">Email Address</FormLabel>
                        <Input
                        name="recipient"
                        placeholder="email"
                        onChange={(e: React.FormEvent<HTMLInputElement>) => handleInputChange(e)}
                        />
                    </FormControl>

                    <Button
                        mt={4}
                        variantColor="teal"
                        isLoading={loading}
                        type="submit"
                    >
                        Submit
                    </Button>
                  </Box>
                )}
            {submitSuccess && (
                    <Box
                        mt="1"
                        fontWeight="semibold"
                        as="h4"
                        lineHeight="tight"
                        backgroundColor="green.50"
                        padding="32"
                    >
                        <Stack spacing={2}>
                            <Heading as="h2" size="md">
                                Here's your promo code!
                            </Heading>
                            <Heading as="h3" size="lg">
                                {discountCode}
                            </Heading>                        
                        </Stack>
                    </Box>
                    )}                
            </Stack>
          </form>

        </Box>
      </Flex>
    );
}

export default ViewComponent;