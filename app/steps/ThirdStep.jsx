import React, { useState } from 'react';
import { Card, Select, TextField, Button , TextContainer, Page, Layout, BlockStack, InlineStack,Text } from "@shopify/polaris";
import { ChoiceDynamic } from '../components/app-page-3/3_choice_list';
import RedirectToSettingsButton from '../components/app-page-3/3_redirect_button';


const ThirdStep = ({ prevStep, nextStep }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [brandInfo, setBrandInfo] = useState('');

    const currentUserBaseUrl = '';
    const additionalEndpoint = '/app/menu';



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
                                Brand Identity
                          </Text>
                          <Text variant="bodyLg" as="p">
                               The more Avto knows about your brand, the better it can serve your customers and offer them the best possible products. Here is a link explained as easy as possible so everybody can get it. More accurate information will lead to awoseme results :)
                                    
                          </Text>
                              
                    </BlockStack>
                    
                    {/* Form Elements */}
                    <BlockStack gap="200">
                        {/* Dropdown for choosing an option */}
                        <Select
                            label="In which industry is your shopify store?"
                            options={[
                               
                               
                                {label: '18-24', value: '19-24'},
                                {label: '25-34', value: '25-34'},
                                {label: '35-44', value: '35-44'},
                                {label: '45-54', value: '45-54'},
                                {label: '55-64', value: '55-64'},
                                {label: '65+', value: '65+'}
                             // Make a default option
                              
                                // Add more options as needed
                            ]}
                            onChange={handleSelectChange} // Ensure this function is defined to handle changes
                            value={selectedOption} // Ensure this state is managed for the selected option
                        />

                        {/* Text Field for Brand Information */}
                        <TextField
                            label="What problem does your Company solve?"
                            value={brandInfo} // Ensure this state is managed
                            onChange={handleBrandInfoChange} // Ensure this function is defined to handle changes
                            multiline={3}
                            placeholder="My company solves..."
                        />
                        <ChoiceDynamic  gap ="300"/>
                         <TextField
                            label="What is the solution you provide?"
                            value={brandInfo} // Ensure this state is managed
                            onChange={handleBrandInfoChange} // Ensure this function is defined to handle changes
                            multiline={3}
                            placeholder="Our solution is..."
                        />
                       
                        
                    </BlockStack>

                    {/* Navigation Buttons */}
                    
                    <InlineStack gap="300">
                        <Button onClick={prevStep}>Previous Step</Button>     

                           <RedirectToSettingsButton baseUrl={currentUserBaseUrl} endpoint={additionalEndpoint} />  
                                    
                       
                      
                    </InlineStack>
                        
                   
                </BlockStack>
            </Card>
        </Layout.Section>
    </Layout>
</Page>
    );
};

export default ThirdStep;