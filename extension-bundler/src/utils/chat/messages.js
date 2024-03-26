import { Message } from "./messageElements.js"
import { convertMarkdownToHTML } from "./markdownSupport.js";


export function removeMessages(container, messages=null, staticAddedMessages=0){
    if(container.childElementCount === 0) {
        return { initConversation: true }
    }

    for(let i = 0; i < staticAddedMessages; i++)
        container.removeChild(container.lastChild)

    return { initConversation: false, newMessages: messages.length - container.childElementCount }
}

function removeAnnotations(message, annotations) {
    if(!annotations || annotations.length === 0) return
    for(let annotation of annotations){
        message.textContent = message.textContent.replace(annotation.text, "")
    }
}

function extractProduct(message) {
    const productHandleRegex = /product[ _]handle:\s*([^\s]+)/i
    const variantIdRegex = /variant[ _]id:\s*(gid:\/\/shopify\/ProductVariant\/\d+)/i

    const messageText = message.textContent

    const productHandleMatch = messageText.match(productHandleRegex)
    const variantIdMatch = messageText.match(variantIdRegex)

    if(productHandleMatch && variantIdMatch) {
        const [ productHandleText, productHandle ] = productHandleMatch
        const [ variantIdText, variantId ] = variantIdMatch

        message.textContent =  
            messageText.split(productHandleText).join("").split(variantIdText).map(s => s.trim()).join("")

        return {
            productHandle: productHandle, 
            variantId: variantId.split("/").pop()
        }
    }
}

export async function mapMessages({container, messages, staticAddedMessages}){
    const { initConversation, newMessages } = removeMessages(container, messages, staticAddedMessages)
    const userMessageCopy = new Message("", "user", null, {}).content
    const assistantMessageCopy = new Message("", "assistant", null, {}).content

    const copyMessages = initConversation ? messages : messages.slice(messages.length - newMessages, messages.length)

    let lastMessageType

    for(let i = 0; i < copyMessages.length; i++) {
        const message = copyMessages[i]

        const clone = message.role === "assistant" ? 
            assistantMessageCopy.cloneNode(true) : userMessageCopy.cloneNode(true)
        clone.children[0].textContent = message.messageText
        clone.style.marginTop = lastMessageType === "assistant" && message.role === "assistant"
         ? "0.5em" :  lastMessageType ? "1em" : "0em"
        lastMessageType = message.role


        container.appendChild(clone)

        if(message.role === "assistant"){
            removeAnnotations(clone.children[0], message.annotations)
            convertMarkdownToHTML(clone.children[0])
            extractProduct(clone.children[0])
        }
    }
}
