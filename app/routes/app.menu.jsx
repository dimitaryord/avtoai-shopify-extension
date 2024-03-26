import { Page, InlineGrid, Card, BlockStack, Box, Text, Divider } from '@shopify/polaris'
import AssistantCard from '../components/navigation/assistantCard';
import InformationSide from '../components/navigation/informationSide';
import DocumentationCard from '../components/navigation/documentationCard';

export default function Menu() {

    return (
        <Page >
            <main class="grid md:grid-cols-2 gap-4 grid-cols-1">
                <BlockStack gap="400" className="px-2 ">
                    <div className="text-center md:text-left mb-11 md:mb-0  ">
                        <Text variant="heading3xl" as="h2">Assistants</Text>
                    </div>
                    <Card roundedAbove="sm">
                        <BlockStack gap="400">
                            <AssistantCard heading="Assistant 1" status="Active" link="https://link" />
                        </BlockStack>
                    </Card>
                    <Card roundedAbove="sm">
                        <BlockStack gap="400">
                            <AssistantCard heading="Assistant 1" status="Active" link="https://link" />
                        </BlockStack>
                    </Card>
                    <Card roundedAbove="sm">
                        <BlockStack gap="400">
                            <AssistantCard heading="Assistant 1" status="Active" link="https://link" />
                        </BlockStack>
                    </Card>
                </BlockStack>


                <BlockStack gap={{ lg: "400", md: "200" }} className="px-2">
                    <div className="text-center md:text-left my-11 md:my-0 ">
                        <Text variant="heading3xl" as="h2">Information</Text>
                    </div>

                    <Card roundedAbove="sm">
                        <BlockStack gap="1200">
                            <BlockStack gap="500">
                                <BlockStack gap="500">
                                    <Text variant="heading2xl" as="h3">News</Text>
                                    <Divider borderColor="border-inverse" />
                                </BlockStack>

                                <BlockStack gap="500">
                                    <InformationSide version="Version 5" description="An upgraded version of the current system has been created! New product matching and more..." gap="500" />
                                    <InformationSide version="Version 5" description="An upgraded version of the current system has been created! New product matching and more..." gap="500" />
                                    <InformationSide version="Version 5" description="An upgraded version of the current system has been created! New product matching and more..." gap="500" />
                                </BlockStack>
                            </BlockStack>

                            <Divider borderColor="border-inverse" />


                            <DocumentationCard version="Documentation" description="We present to you the Avtoai documentation. You can go through it and learn about the capability of our ai assistant." gap="1000" />


                        </BlockStack>
                    </Card>

                </BlockStack>

            </main>
        </Page>
    )
}
