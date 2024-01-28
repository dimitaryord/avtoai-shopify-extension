import formElements from "../components/form";
import { useMemo, useEffect } from "react";
import zod from "zod";

export function createFormElement(
  component,
  errorMessage,
  index,
  formData,
  setFormData
) {
  switch (component.type) {
    case "input":
      return (
        <div key={`form-element-${index}`}>
          <formElements.Input
            id={component.id}
            label={component.label}
            placeholder={component.placeholder}
            multiline={component.multiline}
            value={formData[component.id]}
            onChange={(value) =>
              setFormData({ ...formData, [component.id]: value })
            }
          />
          <formElements.Error
            condition={errorMessage}
            message={errorMessage}
            fieldID={component.id}
          />
        </div>
      );
    case "options":
      return (
        <div key={`form-element-${index}`}>
          <formElements.Options
            id={component.id}
            label={component.label}
            options={component.options}
            value={
              formData[component.id]
                ? formData[component.id]
                : component.options[0]
            }
            onChange={(value) =>
              setFormData({ ...formData, [component.id]: value })
            }
          />
          <formElements.Error
            condition={errorMessage}
            message={errorMessage}
            fieldID={component.id}
          />
        </div>
      );
    case "choice":
      return (
        <div key={`form-element-${index}`}>
          <formElements.Choice
            id={component.id}
            title={component.title}
            choices={component.choices}
            selected={
              formData[component.id]
                ? formData[component.id]
                : component.choices[0].value
            }
            onChange={(value) =>
              setFormData({ ...formData, [component.id]: value })
            }
          />
          <formElements.Error
            condition={errorMessage}
            message={errorMessage}
            fieldID={component.id}
          />
        </div>
      );
    default:
      return null;
  }
}

export function useFormDataInit(initialFormData, components, setFormData) {
  useEffect(() => {
    if (initialFormData) setFormData(initialFormData);
    else {
      setFormData(
        components.reduce((object, component) => {
          if (component.type == "input") object[component.id] = "";
          else if (component.type == "options")
            object[component.id] = component.options[0];
          else if (component.type == "choice")
            object[component.id] = component.choices[0].value;

          return object;
        }, {})
      );
    }
  }, [setFormData, components, initialFormData]);
}

function createElementRule(component) {
  const rules = component.rules;

  let basic =
    rules.check == "number"
      ? zod.number("value is not a number")
      : zod.string("value is not a string");

  if (rules == "required")
    return basic.min(1, { message: `${component.errorName} is required.` });

  if (rules.min)
    if (rules.min == 1)
      basic = basic.min(rules.min, {
        message: `${component.errorName} is required.`,
      });
    else
      basic = basic.min(rules.min, {
        message: `${component.errorName} should be at least ${rules.min} characters long.`,
      });

  if (rules.max)
    basic = basic.max(rules.max, {
      message: `${component.errorName} shouldn't be longer than ${rules.max} characters long.`,
    });

  if (rules.between) {
    const message = `${component.errorName} should be between ${rules.between[0]} and ${rules.between[1]} characters long`;

    basic = basic.min(rules.between[0], {
      message: message,
    });

    basic = basic.max(rules.between[1], {
      message: message,
    });
  }

  if (rules.check == "email")
    basic = basic.email("It should be a valid email address.");

  return basic;
}

export function useZodForm(components) {
  const zodFormCheck = useMemo(() => {
    const zodObject = components.reduce((object, component) => {
      if (component.rules) object[component.id] = createElementRule(component);
      return object;
    }, {});

    return zod.object(zodObject);
  }, [components]);

  return zodFormCheck;
}

export function createZodIssues(validationResult) {
  return validationResult.error.issues.reverse().reduce((object, issue) => {
    object[issue.path[0]] = issue.message;
    return object;
  }, {});
}
