import {
  BlockStack,
  Form,
  FormLayout,
  Button,
  InlineStack,
} from "@shopify/polaris";
import { useState, useCallback } from "react";
import { useFetcher, useNavigate } from "@remix-run/react";
import LoadingScreen from "../components/loading/loadingSetupForm";

import {
  useZodForm,
  createFormElement,
  useFormDataInit,
  createZodIssues,
} from "../setup/readSetup";
import useFormStore from "../store/form";

function StepElement({ stepElementData }) {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const previousStep = useFormStore((state) => state.previousStep);
  const formDataStorage = useFormStore((state) => state.formData);
  const setFormDataStorage = useFormStore((state) => state.setFormData);
  const refreshFormDataStorage = useFormStore((state) => state.refreshFormData);
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
    }
    else return setErrors(createZodIssues(validationResult));


    if (stepElementData.isLastStep) {
      fetcher.submit({ formData: formDataStorage }, { method: "POST", encType: "application/json" });
      setIsLoading(true);
    } else {
      nextStep();
    }

  }, [
    formData,
    formDataStorage,
    nextStep,
    fetcher,
    setFormDataStorage,
    zodFormCheck,
    stepElementData.isLastStep,
  ]);

  if (fetcher.data) {
    setTimeout(() => {
      setIsLoading(false);
      refreshFormDataStorage();
      navigate("/app");
    }, 500)
  }


  const back = useCallback(() => {
    setFormDataStorage(formData);
    previousStep();
  }, [previousStep, formData, setFormDataStorage]);

  if (isLoading) {
    return <div className="App">
      <LoadingScreen />
    </div>;;
  }
  return (
    <section className="w-[80%]">
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
    </section>
  );
}

export default StepElement;
