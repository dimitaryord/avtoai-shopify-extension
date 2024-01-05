import React from 'react';
import {
  Page,
  Layout,
  Text,
  Card,
  BlockStack,
  InlineStack,
  Divider
} from "@shopify/polaris";

//import F1Button from '../components/App-Page-1/F1_button';

function FirstStep({ nextStep }) {
    return (
        <Page>
            <Layout>
                <Layout.Section>
                    <Card>
                        <BlockStack gap="500">
                            <BlockStack gap="300">

                                <Text as="h1" variant="heading3xl">
                                    Cheers for installing Avto!
                                </Text>
                            </BlockStack>

                            <BlockStack gap="1000">

                                <h1 class="text-xl font-extrabold bg-blue-200 p-4 rounded-lg" >
                                Get ready to watch your customer interactions bloom and sales grow. We're here with you at every step, making online shopping as personal and effective as ever. Welcome to the future of e-commerce!
                                </h1>
                                
                                

                                
                            </BlockStack>

                            <Divider borderColor="border-inverse" borderWidth="100" />

                            <BlockStack>

                                
                            </BlockStack>

                            <BlockStack gap="200">
                               
                                <h1 class="text-2xl font-bold animate-pulse text-center mx-auto">
                                    Dive in, explore, and watch your business grow!"
                                </h1>
                                <div class="flex justify-center items-center w-full"  >
                                    <img src="big.jpg" alt="alternate text" class="w-96 h-96" />
                                </div>

                            </BlockStack>
                            <InlineStack gap="300">
                               
                            <div class="flex justify-center items-center w-full h-auto">
                                <button size='large' fullWidth={true} onClick={nextStep} variant="primary" className="text-xl font-bold py-6 px-12 bg-blue-500 hover:bg-blue-700 text-white rounded-md transition ease-in duration-200 transform hover:scale-105">


                                    <h1 as="h1" variant="headinglg" class="text-2xl">
                                        Next Steps
                                    </h1>

                                </button>
                                </div>

                            </InlineStack>
                        </BlockStack>
                    </Card>
                </Layout.Section>
            </Layout>
        </Page>
    );
}

export default FirstStep;