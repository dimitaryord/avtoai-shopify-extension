export default async function pullMessages({ openai, threadId, lastRunId }) {
    const messages = await openai.beta.threads.messages.list(threadId);
    const mappedMessages = messages.body.data.map(message => { 
        return {
            role: message.role, 
            messageText: message.content[0].text.value,
            annotations: message.content[0].text.annotations   
        };
    });

    let code;

    if(lastRunId){
        const runSteps = await openai.beta.threads.runs.steps.list(
            threadId,
            lastRunId
        );
        const interpreterSteps = runSteps.data.map(step => step.step_details);
        const codeInterpreterStep = interpreterSteps.filter(step => step.type === "tool_calls").pop();
        code = codeInterpreterStep?.tool_calls[0].code_interpreter.outputs?.pop()?.logs
        .replaceAll('\n', '').replaceAll("'", '"').replaceAll('(', '').replaceAll(')', '');
    }

    return { messages: mappedMessages, code };
}