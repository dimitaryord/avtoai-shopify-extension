import StepElement from "../steps/StepElement";
import { Card, Page, Layout, BlockStack, ProgressBar } from "@shopify/polaris";

import { useEffect, useState, useCallback } from "react";

import useFormStore from "../store";
import setupObject from "../setup/setup.json";

function MainForm() {
  const [totalSteps, setTotalSteps] = useState(1);
  const [currentStep, setCurrentSteps] = useState(1);

  const totalStepsStore = useFormStore((state) => state.totalSteps);
  const currentStepStore = useFormStore((state) => state.currentStep);
  const initialFormDataStore = useFormStore((state) => state.formData);

  useEffect(() => {
    setTotalSteps(totalStepsStore);
    setCurrentSteps(currentStepStore);
  }, [totalStepsStore, currentStepStore]);

  const getStepElementData = useCallback(() => {
    return {
      ...Object.values(setupObject)[currentStep - 1],
      initialFormData: initialFormDataStore,
      isLastStep: currentStep == totalSteps,
    };
  }, [currentStep, totalSteps, initialFormDataStore]);

  const progress = (currentStep / totalSteps) * 100;

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="200">
              <StepElement stepElementData={getStepElementData()} />
              <ProgressBar progress={progress} size="small" />
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export default MainForm;
