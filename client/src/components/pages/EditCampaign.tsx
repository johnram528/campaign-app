import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FormLabel,
  FormControl,
  Input,
  Button,
  Heading,
  Stack,
  Box,
  Flex,
  useToast
} from "@chakra-ui/core";
import { Campaign } from "../../models/campaign.interface";

function EditCampaign(): JSX.Element {
    let navigate = useNavigate();
    let { campaignId } = useParams();

    interface IValues {
        [key: string]: any;
    }


    const [campaign, setCampaign] = useState<Campaign>()
    const [values, setValues] = useState<IValues>([]);
    const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
          const response = await fetch(`http://localhost:5000/api/v1/campaign/${campaignId}`);
          const json = await response.json();
          setCampaign(json)    
        }
        fetchData();    
      }, [campaignId]);

    const toast = useToast();

    const handleFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);

        const submitSuccess: boolean = await submitForm();
        setSubmitSuccess(submitSuccess);
        setLoading(false);
        if(submitSuccess) {
            navigate('/');
        }
    }

    const submitForm = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/campaign/${campaignId}`, {
                method: "put",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }),
                body: JSON.stringify(values)
            });
            if (!response.ok) {
              const message = `An error has occured: ${response.status}`;
              throw new Error(message);
            }
            toast({
              title: "Success!",
              description: 'The campaign has been updated.',
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

    const setFormValues = (formValues: IValues) => {
        setValues({
            ...values,
            ...formValues
        })
    }

    const setDiscountCodes = (formValues: IValues, index: number) => {
      console.log(index)
        setValues({
            ...values,
            discountCodes: [
              ...values.discountCodes.map((dc: any, i: any) => i === index ? formValues : dc)
            ]
            
        })
    }

    const handleInputChanges = (e: React.FormEvent<HTMLInputElement>, index?: number) => {
        e.preventDefault();
        if(e.currentTarget.name === 'code') {
          setDiscountCodes({
            [e.currentTarget.name]: e.currentTarget.value
        }, index || 0)
        }else {
          setFormValues({
            [e.currentTarget.name]: e.currentTarget.value
        })
        }
    }


    return (
      <Flex justify="center">
        {campaign && <Box p={4} display={{ md: 'flex' }}>
          <form onSubmit={handleFormSubmission}>
            <Stack spacing={3}>
              <Heading>Edit campaign</Heading>
                {submitSuccess && (
                  <div className="alert alert-info" role="alert">
                    The form was successfully submitted!
                  </div>
                )}
              <FormControl>
                <FormLabel htmlFor="name">Campaign name</FormLabel>
                <Input
                  name="name"
                  placeholder="name"
                  onChange={(e: React.FormEvent<HTMLInputElement>) => handleInputChanges(e)}
                  defaultValue={campaign?.name}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="description">Description</FormLabel>
                <Input
                  name="description"
                  placeholder="description"
                  onChange={(e: React.FormEvent<HTMLInputElement>) => handleInputChanges(e)}
                  defaultValue={campaign?.description}
                />
              </FormControl>
              <Heading as="h3" size="lg">
                Discount Codes
              </Heading>
              {campaign?.discountCodes?.map((discountCode: any, i: number) =>
                <FormControl key={i}>
                  <FormLabel htmlFor="code">Code</FormLabel>
                    <Input
                      name="code"
                      placeholder="discount code"
                      onChange={(e: React.FormEvent<HTMLInputElement>) => handleInputChanges(e, i)}
                      defaultValue={campaign?.discountCodes[i].code}
                    />
                </FormControl>
              )}

              <Button
                mt={4}
                variantColor="teal"
                isLoading={loading}
                type="submit"
              >
                Edit Campaign
              </Button>
            </Stack>
          </form>
        </Box>}
      </Flex>
      
    );

}
export default EditCampaign;