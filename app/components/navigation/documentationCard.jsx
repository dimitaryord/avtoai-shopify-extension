import React from 'react';
import {
    BlockStack,
    Card,
    Text,
} from '@shopify/polaris';

export default function DocumentationCard({ version, description, gap }) {
    return (

        <BlockStack gap={gap}>
            <BlockStack gap={gap}>
                <div class=" flex items-center justify-center">
                    <Text variant="heading2xl" as="h3">
                        {version}
                    </Text>
                </div>

                <div class="flex items-center justify-center">
                    <p class="text-center md:text-left font-bold">
                        {description}
                    </p>
                </div>


            </BlockStack>


            <div class=" flex items-center justify-center">
                <button class="bg-black text-white px-16 md:px-32 py-1 text-sm rounded-xl shadow hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50">
                    View the documentation
                </button>
            </div>



        </BlockStack>

    );
}