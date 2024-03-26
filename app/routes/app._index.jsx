import React from "react";
import {Page, Banner, CalloutCard, EmptyState, Text } from "@shopify/polaris";

import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { authenticate } from "../shopify.server";
import db from "../db";

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const user = await db.findUserByShop(session.shop);

  return json({ hasAssistant: user ? true : false });
}

function FirstStep() {
  const { hasAssistant } = useLoaderData();

  if (!hasAssistant)
    return (
      <div className="w-full sm:h-[80vh] min-[480px]:h-[90vh] h-screen flex flex-col items-center justify-center">
        <Text variant="headingXl" as="h1" >Thank you for installing AVTO</Text>
        <EmptyState
          heading="Welcome to the future of Ecom"
          action={{ content: 'Setup an assistant', url: "/app/setup" }}
          secondaryAction={{
            content: 'Contact us',
            url: 'https://calendly.com/avtoai/demo',
          }}
          image="no-assistants.png">
          <p>There are no currently available assistants. Create a new one</p>
        </EmptyState>
      </div>
    );
  else
    return (
      <Page fullWidth>
        <div className="p-8 space-y-2">
          <Banner title="Assistant Updated">
            <p className="text-xs">
              This assistant was last updated on March 26 2024.
            </p>
          </Banner>
          <CalloutCard
            title="Update your assistant"
            primaryAction={{
              content: "Edit Assistant",
              url: "/app/setup",
            }}
            secondaryAction={{
              content: "Get help with setting it up",
              url: "https://calendly.com/avtoai/demo",
            }}
            illustration="avto.svg"
          >
            <p>Change the information given to AVTO.</p>
          </CalloutCard>
        </div>
      </Page>
    );
}

export default FirstStep;
