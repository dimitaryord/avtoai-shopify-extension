import React from "react";
import { Layout, TextContainer, LegacyCard, FormLayout, TextField } from "@shopify/polaris";

export function Section() {

    return (
        <Layout>
        <Layout.Section variant="oneThird">
          <div style={{ marginTop: 'var(--p-space-100)' }}>
            <TextContainer>
              <h1 id="storeDetails" variant="headingMd" as="h2" className="text-xl font-bold underline">
                Store details
              </h1>
              <h1 tone="subdued" as="p">
                Shopify and your customers will use this information to contact you.
              </h1>
            </TextContainer>
          </div>
        </Layout.Section>
        <Layout.Section>
          <LegacyCard sectioned>
            <FormLayout>
              <TextField label="Store name" onChange={() => {}} autoComplete="off" />
              <TextField type="email" label="Account email" onChange={() => {}} autoComplete="email" />
            </FormLayout>
          </LegacyCard>
        </Layout.Section>
      </Layout>
      
      );
}