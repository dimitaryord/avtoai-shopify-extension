import React from 'react';
import {
    BlockStack,
    Button,
    ButtonGroup,
    Card,
    InlineStack,
    Text,
} from '@shopify/polaris';

export default function InformationSide({ version, description, gap }) {
    return (
        <Card roundedAbove="sm" >
            <BlockStack gap={gap}>
                <BlockStack gap={gap}>
                    <Text variant="headingLg" as="h5" className="md:text-left text-center">
                        {version}
                    </Text>
                    <Text as="p" fontWeight="bold" >
                        {description}
                    </Text>
                </BlockStack>


                <div class=" flex items-center justify-center">
                <button class="bg-black text-white px-2 md:px-32 py-1 text-base rounded-xl shadow hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50">
                    Read More
                </button>
                </div>



            </BlockStack>
        </Card>
    );
}