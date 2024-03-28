import { Text, Card, Icon } from '@shopify/polaris';
import React from 'react';


export default function AssistantCard({ heading, status, link, image, tone }) {

    return (

        <Card>

            <Text variant="heading2xl" as="h3">
                {heading}
            </Text>

            <div class="flex p-5">
                
                <div class="space-y-5">
                   
                    <div class="flex items-start mr-16">
                    <Icon source={MinusCircleIcon} tone="critical" />
                    <Text as="p" fontWeight="bold">{status}</Text>

                    </div>
                     
                   
                    <Text as="p" fontWeight="bold">Dataset: {link}</Text>
                </div>

                <div class="flex flex-grow flex-col justify-end items-end space-y-2">
                    <button class="bg-black text-white px-2 py-1 rounded-lg shadow hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 w-1/2 text-center">
                        Edit
                    </button>
                    <button class=" text-black px-4 md:px-2 py-1 border border-black rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 w-1/2 text-center">
                        Set as active
                    </button>
                </div>
            </div>



        </Card>
    );
}