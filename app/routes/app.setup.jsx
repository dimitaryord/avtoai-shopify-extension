import { json } from "@remix-run/node";
import { Card, Page, Layout, ProgressBar } from "@shopify/polaris";
import { useEffect, useState, useCallback } from "react";

import { authenticate } from "../shopify.server";
import { createModelV1, updateModelV1File } from "../assistant/model.v1";
import { fetchAllProducts } from "../queries";
import db from "../db";

import StepElement from "../steps/StepElement";
import useFormStore from "../store";
import setupObject from "../setup/setup.json";

export const action = async ({ request }) => {
  const { session, admin } = await authenticate.admin(request);
  const body = await request.json();
  const formData = body.formData;

  let user = await db.findUserByShop(session.shop);
  if(user){
    const formDataFileId = await updateModelV1File( user.assistantId, [ user.productsFileId ], {
      id: user.formDataFileId,
      name: "formData",
      data: formData
    });

    user = await db.updateUser(user.id, {
      formDataFileId: formDataFileId,
      formDataFileContent: formData
    });
  }
  else {
    const products = await fetchAllProducts(admin);

    const { assistantId, formDataFileId, productsFileId } = await createModelV1({
      assistantName: session.shop,
      formData: formData,
      products: products
    });

    user = await db.createUser({
      shop: session.shop,
      assistantId: assistantId,
      formDataFileId: formDataFileId,
      productsFileId: productsFileId,
      formDataFileContent: JSON.stringify(formData),
      productsFileContent: JSON.stringify(products),
    });
  }

  return json({ message: "Successfully created or updated user.", user: user.id });
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
