import { InlineError } from "@shopify/polaris";

function Error({ condition, message, fieldID }) {
  return (
    <>
      {condition ? <InlineError message={message} fieldID={fieldID} /> : null}
    </>
  );
}

export default Error;
