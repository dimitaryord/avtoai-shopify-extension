export default async function pullMessages({ openai, threadId }) {
    const messages = await openai.beta.threads.messages.list(threadId);
    const mappedMessages = messages.body.data.map(message => { 
        return {
            role: message.role, 
            messageText: message.content[0].text.value,
            annotations: message.content[0].text.annotations   
        };
    });

    return mappedMessages;
}