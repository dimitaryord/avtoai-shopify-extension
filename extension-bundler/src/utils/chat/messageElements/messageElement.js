import { convertMarkdownToHTML } from "../markdownSupport.js"
import styled from "../../lib2.js"

export class Message {
    static lastMessageType = "empty"

    constructor(messageText, role, innerContent, { paddingBlock=false, paddingInline=true, border=false }) {
        const messageContainer = styled.div({
            id: "avtoai-assistant-message-container",
            style: {
                maxWidth: "90%",
                borderRadius: "10px",
                border: border ? "1px solid var(--avtoai-assistant-colors-text-color)" : "none",
                paddingInline: paddingInline ? "1.25em" : "0px",
                paddingBlock: paddingBlock ? "1em" : "0px",
                marginTop: Message.lastMessageType === "empty" ? "0em"
                 : Message.lastMessageType === "assistant" && role === "assistant" ? "0.5em" : "1em",
                alignSelf: role === "assistant" ? "flex-start" : "flex-end",
                backgroundColor: role === "assistant" ? "var(--avtoai-assistant-colors-message-assistant-bg)" : 
                "var(--avtoai-assistant-colors-color-theme)",
            }
        })
        Message.lastMessageType = role

        const messageP = styled.p({
            id: "avtoai-assistant-message",
            style: { color: role === "assistant" ? "var(--avtoai-assistant-colors-text-color)" : 
                "var(--avtoai-assistant-colors-color-theme-text-color)", 
                fontSize : "var(--avtoai-assistant-chat-app-message-font-size)" },
            text: messageText
        })
        messageContainer.appendChild(messageP)

        if(innerContent) {
            this.innerContent = innerContent
            messageContainer.appendChild(innerContent)
        }

        this.content = messageContainer
        this.textElement = messageP
        this.text = messageP.textContent
    }

    isEmpty(){
        return this.text.trim() === "" && this.content.contains(this.innerContent)
    }

    updateMessage(message) {
        if(this.content.contains(this.innerContent)){
            this.content.removeChild(this.innerContent)
            styled.designComponent(this.content, {
                style: {
                    paddingInline: "1.25em",
                    paddingBlock: "0px",
                }
            })
        }

        if(typeof message === 'string'){
            this.textElement.textContent = message
            this.text = message
        }
        else if(typeof message === 'function'){
            this.textElement.textContent = message(this.text)
            this.text = message(this.text)
        }

        convertMarkdownToHTML(this.textElement)
    }

    updateInnerContent(innerContent) {
        if(this.content.contains(this.innerContent))
            this.content.removeChild(this.innerContent)
        this.content.appendChild(innerContent)
        this.innerContent = innerContent
    }
}

export class MessageElement extends Message {
    constructor(container, messageText, role) {
        super(messageText, role, null, {})
        container.appendChild(this.content)
    }
}