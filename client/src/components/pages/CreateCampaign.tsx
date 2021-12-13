import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormErrorMessage,
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

function CreateCampaign(): JSX.Element {
    let navigate = useNavigate();

    interface IValues {
        [key: string]: any;
    }

    const [values, setValues] = useState<IValues>([]);
    const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const toast = useToast();

    const handleFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        const formData = {
            name: values.name,
            description: values.description,
            discountCodes: values.discountCodes,
        }

        const submitSuccess: boolean = await submitForm(formData);
        setSubmitSuccess(submitSuccess);
        setValues({...values, formData});
        setLoading(false);
        navigate('/');
    }

    const submitForm = async (formData: {}) => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/campaign`, {
                method: "post",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }),
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
              const message = `An error has occured: ${response.status}`;
              throw new Error(message);
            }
            toast({
              title: "Success!",
              description: 'The campaign has been created.',
              status: "error",
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

    const handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        setFormValues({
            [e.currentTarget.name]: e.currentTarget.value
        })
    }


    return (
      <Flex justify="center">
        <Box p={4} display={{ md: 'flex' }}>
          <form onSubmit={handleFormSubmission}>
            <Stack spacing={3}>
              <Heading>Create campaign</Heading>
              {!submitSuccess && (
                  <div className="alert alert-info" role="alert">
                    Fill out the form below to create a new campaign.
                          </div>
                )}
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
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="description">Description</FormLabel>
                <Input
                  name="description"
                  placeholder="description"
                  onChange={(e: React.FormEvent<HTMLInputElement>) => handleInputChanges(e)}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="discountCodes">Discount Codes</FormLabel>
                <Input
                  name="discountCodes"
                  placeholder="discount code"
                  onChange={(e: React.FormEvent<HTMLInputElement>) => handleInputChanges(e)}
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
            </Stack>
          </form>
        </Box>
      </Flex>
      
    );

}
export default CreateCampaign;