import React from "react";
import { Page, Layout, Card, BlockStack, InlineStack } from "@shopify/polaris";
import RedirectButton from "../components/navigation/redirect_button";

function FirstStep() {
  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Card>
            <div
              gap="500"
              class="w-full h-[80vh] flex justify-center"
              style={{
                backgroundImage: "url(background.png)",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <BlockStack className="relative top-[10%]" gap="500">
                <h1 class="text-7xl font-bold text-blue-400 text-center mx-auto">
                  Cheers for installing Avto!
                </h1>

                <h1 class="text-3xl text-white font-bold text-center mx-auto mt-10">
                  Dive in, explore, and watch your business 
                  <span className="text-blue-400"> grow!</span>
                </h1>

                <div class="w-full flex justify-center mt-40">
                  <InlineStack gap="200">
                    <button className="py-4 px-6 bg-white hover:bg-black hover:text-white
                     shadow-md shadow-black hover:shadow-white text-xl border-1 border-black font-bold">
                      Book a call
                    </button>
                    <RedirectButton
                      text="Let's setup!"
                      className="bg-blue-400 hover:bg-black hover:shadow-white
                       shadow-md shadow-black  text-black hover:text-white font-bold py-4 px-24 text-2xl"
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
