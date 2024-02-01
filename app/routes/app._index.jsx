import React from "react";
import { Page, Layout, Card, BlockStack, InlineStack } from "@shopify/polaris";
import RedirectButton from "../components/navigation/redirect_button";

function FirstStep() {
  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Card padding="0">
            <div
              gap="500"
              className="w-full sm:h-[80vh] min-[480px]:h-[90vh] h-screen flex justify-center"
              style={{
                backgroundImage: "url(background.png)",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <BlockStack className="relative lg:top-[10%] top-[5%]" gap="500">
                <h1 class="lg:text-7xl text-4xl font-bold text-blue-400 text-center mx-auto">
                  Cheers for installing Avto
                </h1>

                <h1 class="lg:text-3xl lg:text-left text-center text-xl drop-shadow-md text-white font-bold mx-2 mt-5">
                  Dive in, explore, and watch your business grow
                </h1>

                <div class="w-full flex justify-center mt-36">
                  <InlineStack gap="200">
                    <button className="py-4 lg:px-6 px-2 bg-white hover:bg-blue-400
                     shadow-md shadow-black hover:shadow-white lg:text-xl text-base border-1 border-black font-bold">
                      Book a call
                    </button>
                    <RedirectButton
                      text="Let's setup!"
                      className="bg-black hover:bg-blue-400 hover:shadow-white
                       shadow-md shadow-black  text-white hover:text-black font-bold py-4 lg:px-24 px-10 lg:text-2xl text-lg"
                      baseUrl=""
                      endpoint="/app/setup"
                    />
                  </InlineStack>
                </div>
              </BlockStack>
            </div>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export default FirstStep;
