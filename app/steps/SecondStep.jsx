import React, { useState, useRef } from 'react';
import { Card, Select, TextField, Button, Page, Layout, BlockStack, InlineStack, Text } from "@shopify/polaris";
import { SingleChoiceListExample } from "../components/app-page-2/2_choice"; 
import { Form } from "../components/app-page-2/2_form"; 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const SecondStep = ({ prevStep, nextStep }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [brandInfo, setBrandInfo] = useState('');
    const formRef = useRef();

    // Update state when a different dropdown option is selected
    const handleSelectChange = (value) => setSelectedOption(value);
    const handleBrandInfoChange = (value) => setBrandInfo(value);

    // Function to be called on successful form submission
    const handleFormSubmit = () => {
        console.log("Form Data Submitted");
        nextStep(); // Navigate to the next page after form submission
    };

    // Function to trigger form submission
    const handleNextClick = () => {
        if (formRef.current) {
            formRef.current.submitForm();
        }
    };

    return (
        <Page>
            <Layout>
                <Layout.Section>
                    <Card>
                        <BlockStack gap="500">
                            <BlockStack gap="200">
                                <Text as="h1" variant="heading3xl">Product Information</Text>
                                <Text variant="bodyLg" as="p">
                                    We want to know more about your brand. 
                                </Text>
                                <h1>
                                    This will help us to create a better upsell assistant that will be able to offer the best possible products to your customers.
                                </h1>
                            </BlockStack>
                            
                            <BlockStack gap="200">
                                <Select
                                    label="In which industry is your Shopify store?"
                                    options={[
                                        {label: 'Other', value: 'Other'},
                                        // ... other options ...
                                    ]}
                                    onChange={handleSelectChange}
                                    value={selectedOption}
                                />
                                <TextField
                                    label="Brand Information"
                                    value={brandInfo}
                                    onChange={handleBrandInfoChange}
                                    multiline={3}
                                    placeholder="Describe your brand here"
                                />
                                <QueryClientProvider client={queryClient}>
                                    <Form ref={formRef} onSuccessfulSubmit={handleFormSubmit} />
                                </QueryClientProvider>
                                <SingleChoiceListExample /> 
                            </BlockStack>

                            <InlineStack gap="300">
                                <Button onClick={prevStep}>Previous Step</Button>
                                <Button primary onClick={handleNextClick}>Next Step</Button>
                            </InlineStack>
                        </BlockStack>
                    </Card>
                </Layout.Section>
            </Layout>
        </Page>
    );
};

export default SecondStep;