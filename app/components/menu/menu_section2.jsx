import {
  Page,
  Layout,
  Card,
  FormLayout,
  TextField,
  TextContainer,
} from '@shopify/polaris';
import React from 'react';




export function Section2() {
  return (

    <Layout>
      <Layout.Section variant="oneThird">
        <div style={{ marginTop: 'var(--p-space-100)' }}>
          <TextContainer>
            <h1 id="storeDetails" variant="headingMd" as="h2" className="text-xl font-bold underline">
              Information for  Avto the Upseller
            </h1>
            <h1 tone="subdued" as="p">
              This information will be used to help Avto the Upseller understand your brand and your customers which will lead to much better results with it's recommends and responses.
            </h1>
          </TextContainer>
        </div>
      </Layout.Section>
      <Layout.Section>
        <Card sectioned>
          <FormLayout>
            <TextField
              label="Things that the Avto the Upseller should know about your brand?"
              multiline={3}
              placeholder="Avto should know..."
            />
          </FormLayout>
        </Card>
      </Layout.Section>
    </Layout>






  );
}
