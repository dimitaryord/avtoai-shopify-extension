import React, { useState } from 'react';
import { Card, Select, TextField, Button , TextContainer, Page, Layout, BlockStack, InlineStack,Text } from "@shopify/polaris";
import { SingleChoiceListExample } from "../components/app-page-2/2_choice"; 
import { Form } from "../components/app-page-2/2_form"; 


const SecondStep = ({ prevStep, nextStep }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [brandInfo, setBrandInfo] = useState('');

    // Update state when a different dropdown option is selected
    const handleSelectChange = (value) => setSelectedOption(value);

    // Update state when brand info is inputted
    const handleBrandInfoChange = (value) => setBrandInfo(value);



    return (
        <Page>
    <Layout>
        <Layout.Section>
            <Card>
                <BlockStack gap="500">
                    {/* Heading and Introduction */}
                    <BlockStack gap="200">
                         <Text as="h1" variant="heading3xl" >
                                Product Information
                          </Text>
                          <Text variant="bodyLg" as="p">
                               We want to know more about your brand. 
                               
                                    
                          </Text>
                          <h1>
                          This will help us to create a better upsell assistant that will be able to offer the best possible products to your customers.
                          </h1>
                              
                    </BlockStack>
                    
                    {/* Form Elements */}
                    <BlockStack gap="200">
                        {/* Dropdown for choosing an option */}
                        <Select
                            label="In which industry is your shopify store?"
                            options={[
                                {label: 'Other', value: 'Other'},
                                {label: 'Jewelry', value: 'Jewelry'},
                                {label: 'Fashion and Apparel', value: 'Fashion and Apparel'},
                                {label: 'Cosmetics', value: 'Cosmetics'},
                                {label: 'Electronics', value: 'Electronics'},
                                {label: 'Food and Beverages', value: 'Food and Beverages'},
                                {label: 'Home and Garden', value: 'Home and Garden'},
                             // Make a default option

                                // Add more options as needed
                            ]}
                            onChange={handleSelectChange} // Ensure this function is defined to handle changes
                            value={selectedOption} // Ensure this state is managed for the selected option
                        />

                        {/* Text Field for Brand Information */}
                        <TextField
                            label="Brand Information"
                            value={brandInfo} // Ensure this state is managed
                            onChange={handleBrandInfoChange} // Ensure this function is defined to handle changes
                            multiline={3}
                            placeholder="Describe your brand here"
                        />

                        <Form /> 

                        <SingleChoiceListExample /> 

                        
                    </BlockStack>

                    {/* Navigation Buttons */}
                    <InlineStack gap="300">
                        <Button onClick={prevStep}>Previous Step</Button>
                        <Button primary onClick={nextStep}>Next Step</Button>
                    </InlineStack>
                </BlockStack>
            </Card>
        </Layout.Section>
    </Layout>
</Page>
    );
};

export default SecondStep;