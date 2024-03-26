export default async function pullMessages({ openai, threadId, runId, lastRunId, checkCurrentStep=false }) {
    const messages = await openai.beta.threads.messages.list(threadId);
    const mappedMessages = messages.body.data
    .filter(message => Array.isArray(message.content) && message.content.length > 0 && message.content[0]?.text?.value)
    .map(message => ({
        role: message.role,
        messageText: message.content[0].text.value,
        annotations: message.content[0].text.annotations
    }));

    let code;
    let currentStep;

    if(lastRunId){
        const runSteps = await openai.beta.threads.runs.steps.list(
            threadId,
            lastRunId
        );
        const interpreterSteps = runSteps.data.map(step => step.step_details);
        const codeInterpreterStep = interpreterSteps.filter(step => step.type === "tool_calls").pop();
        code = codeInterpreterStep?.tool_calls[0].code_interpreter.outputs?.pop()?.logs
        .replaceAll('\n', '').replaceAll("'", '"');
    }

    if(checkCurrentStep) {
        // const runSteps = await openai.beta.threads.runs.steps.list(
        //     threadId,
        //     runId
        // );
        // const steps = runSteps.data.map(step => step.step_details)
        // currentStep = steps.length > 0 ? steps.pop().type : "message_creation";
    }

    return { messages: mappedMessages, code, currentStep: "message_creation" };
}