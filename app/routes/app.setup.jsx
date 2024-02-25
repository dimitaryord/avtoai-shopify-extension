import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Card, Page, Layout, ProgressBar } from "@shopify/polaris";
import { useEffect, useState, useCallback } from "react";

import { authenticate } from "../shopify.server";
import { createModelV1, updateModelV1 } from "../assistant/model.v1";
import { fetchAllProducts } from "../queries";
import db from "../db";

import StepElement from "../steps/StepElement";
import useFormStore from "../store/form";
import setupObject from "../setup/setup.json";

export const action = async ({ request }) => {
  const { session, admin } = await authenticate.admin(request);
  const body = await request.json();
  const formData = body.formData;

  let user = await db.findUserByShop(session.shop);
  const { assistantName, assistantStarters, ...assistantInfo} = formData;

  if(user){
    await updateModelV1(user.assistantId, formData);
    user = await db.updateUser(user.id, {
      assistantName: assistantName,
      assistantStarters: assistantStarters,
      assistantInfo: JSON.stringify(assistantInfo)
    });
  }
  else {
    const products = await fetchAllProducts(admin);

    const { assistantId, productsFileId } = await createModelV1({
      assistantName: session.shop,
      assistantInfo: formData,
      products: products
    });

    user = await db.createUser({
      shop: session.shop,
      assistantId: assistantId,
      assistantName: assistantName,
      assistantStarters: assistantStarters,
      assistantInfo: JSON.stringify(assistantInfo),
      productsFileId: productsFileId,
      productsFileContent: JSON.stringify(products),
    });
  }

  return json({ message: "Successfully created or updated user.", user: user.id });
}

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const user = await db.findUserByShop(session.shop);

  if(user){
    const assistantInfo = JSON.parse(user.assistantInfo)

    return json({ 
      formData: { ...assistantInfo, assistantName: user.assistantName, assistantStarters: user.assistantStarters}
    });
  }

  return json({ formData: null });
}

function MainForm() {
  const { formData: serverData } = useLoaderData();

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
      initialFormData: initialFormDataStore ? initialFormDataStore : serverData,
      isLastStep: currentStep == totalSteps,
    };
  }, [currentStep, totalSteps, initialFormDataStore, serverData]);

  return (
    <Page>
      <Layout>
        <Layout.Section>
            <div className="sm:h-[80vh] min-[480px]:h-[90vh] h-screen flex flex-col">
              <div className="flex-grow flex w-full items-center justify-center">
                <StepElement stepElementData={getStepElementData()} />
              </div>
            </div>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export default MainForm;
