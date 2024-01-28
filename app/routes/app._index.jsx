import React from "react";
import {
  Page,
  Layout,
  Text,
  Card,
  BlockStack,
  InlineStack,
  Divider,
} from "@shopify/polaris";
import RedirectToSetupButton from "../components/app-page-1/redirect_button";
import backgroundImage from "../../public/background.png";


const currentUserBaseUrl = '';
const additionalEndpoint = '/app/setup';


function FirstStep({ nextStep }) {
  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Card>
          <div class = "w-full h-[80vh]" style = {{
            backgroundImage: "url(background22.png)",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}>
            <BlockStack gap="500">
              <BlockStack gap="300">
      
                <h1 class = "text-6xl font-bold text-black text-center mx-auto translate-y-10">
                    Cheers for installing Avto!
                </h1>
                
                
              </BlockStack>
              

              <BlockStack gap="800">
                <h1 class="text-3xl font-bold text-center mx-auto translate-y-9">
                  Dive in, explore, and watch your business grow!
                </h1>
                
                {/*<div class="flex justify-center items-center w-full">
                  <img src="background.png" alt="alternate text" class="w-200 h-200" />
                </div>
            */}
                
              </BlockStack>
              <InlineStack gap="300">
             <div class="flex justify-center items-center">
                <RedirectToSetupButton  baseUrl={currentUserBaseUrl} endpoint={additionalEndpoint}/>
             </div>
              </InlineStack>
            </BlockStack>
          </div>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export default FirstStep;
