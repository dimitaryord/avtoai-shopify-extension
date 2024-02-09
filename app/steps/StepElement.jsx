import {
  BlockStack,
  Form,
  FormLayout,
  Button,
  InlineStack,
} from "@shopify/polaris";
import { useState, useCallback } from "react";
import { useFetcher } from "@remix-run/react";

import {
  useZodForm,
  createFormElement,
  useFormDataInit,
  createZodIssues,
} from "../setup/readSetup";
import useFormStore from "../store";

function StepElement({ stepElementData }) {
  const fetcher = useFetcher();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState([]);

  const previousStep = useFormStore((state) => state.previousStep);
  const setFormDataStorage = useFormStore((state) => state.setFormData);
  const nextStep = useFormStore((state) => state.nextStep);

  useFormDataInit(
    stepElementData.initialFormData,
    stepElementData.components,
    setFormData
  );

  const zodFormCheck = useZodForm(stepElementData.components);

  const handleSubmit = useCallback(async () => {
    const validationResult = zodFormCheck.safeParse(formData);

    if (validationResult.success) {
      setFormDataStorage(formData);
      setErrors({});
      nextStep();
    } 
    else return setErrors(createZodIssues(validationResult));

    if (stepElementData.isLastStep) {
      fetcher.submit({ formData }, { method: "POST", encType: "application/json" });
      console.log("Loading");
    }      
  }, [
    formData,
    nextStep,
    fetcher,
    setFormDataStorage,
    zodFormCheck,
    stepElementData.isLastStep,
  ]);

  if(fetcher.data){
    console.log(fetcher.data)
  }

  const back = useCallback(() => {
    setFormDataStorage(formData);
    previousStep();
  }, [previousStep, formData, setFormDataStorage]);

  return (
    <Form onSubmit={handleSubmit}>
      <FormLayout>
        <BlockStack gap="500">
          <header className="mb-5">
            <BlockStack gap="500">
              <h1 className="font-bold text-5xl">
                {stepElementData.title}
              </h1>
              <p className="font-medium mx-2 text-sm">
                  {stepElementData.description}
              </p>
            </BlockStack>
          </header>


          <BlockStack gap="200">
            {stepElementData.components.map((component, index) =>
              createFormElement(
                component,
                errors[component.id],
                index,
                formData,
                setFormData
              )
            )}
          </BlockStack>

          <InlineStack gap="300">
            <Button onClick={back}>Previous Step</Button>
            <Button submit variant="primary">
              Next Step
            </Button>
          </InlineStack>
        </BlockStack>
      </FormLayout>
    </Form>
  );
}

export default StepElement;
