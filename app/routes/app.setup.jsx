import { json } from "@remix-run/node";
import { Card, Page, Layout, ProgressBar } from "@shopify/polaris";
import { useEffect, useState, useCallback } from "react";

import { authenticate } from "../shopify.server";
import prisma from "../db.server";
import openai from "../openai";

import StepElement from "../steps/StepElement";
import useFormStore from "../store";
import setupObject from "../setup/setup.json";

export const action = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const json = await request.json();
  const formData = json.formData;

  return json({"done": "done"})
}

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

  const progress = ((currentStep-1) / totalSteps) * 100;

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Card>
            <div className="sm:h-[80vh] min-[480px]:h-[90vh] h-screen flex flex-col">
              <div className="flex-grow flex w-full items-center justify-center">
                <StepElement stepElementData={getStepElementData()} />
              </div>
              <ProgressBar progress={progress} size="medium" />
            </div>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export default MainForm;
