import {
  BlockStack,
  Text,
  Form,
  FormLayout,
  Button,
  InlineStack,
} from "@shopify/polaris";
import { useState, useCallback } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  useZodForm,
  createFormElement,
  useFormDataInit,
  createZodIssues,
} from "../setup/readSetup";
import useFormStore from "../store";

const queryClient = new QueryClient();

function StepElement({ stepElementData }) {
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

  const handleSubmit = useCallback(() => {
    const validationResult = zodFormCheck.safeParse(formData);
    if (validationResult.success) {
      setFormDataStorage(formData);
      nextStep();
    } else {
      setErrors(createZodIssues(validationResult));
    }
  }, [formData, nextStep, setFormDataStorage, zodFormCheck]);

  const back = useCallback(() => {
    setFormDataStorage(formData);
    previousStep();
  }, [previousStep, formData, setFormDataStorage]);

  return (
    <Form onSubmit={handleSubmit}>
      <FormLayout>
        <BlockStack gap="500">
          <BlockStack gap="200">
            <Text as="h1" variant="heading3xl">
              {stepElementData.title}
            </Text>
            <Text variant="bodyLg" as="p">
              {stepElementData.description}
            </Text>
          </BlockStack>

          <QueryClientProvider client={queryClient}>
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
          </QueryClientProvider>

          <InlineStack gap="300">
            <Button onClick={back}>Previous Step</Button>
            <Button primary submit>
              Next Step
            </Button>
          </InlineStack>
        </BlockStack>
      </FormLayout>
    </Form>
  );
}

export default StepElement;
