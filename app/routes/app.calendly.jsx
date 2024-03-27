import { Page, Banner, CalloutCard } from "@shopify/polaris";
import React from "react";

export default function CalendlyPage() {
  return (
    <Page fullWidth>
      <div className="p-8 space-y-2">
        <Banner title="Assistant Updated">
          <p className="text-xs">
            This assistant was last updated on March 7, 2017 at 3:12pm EDT.
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
