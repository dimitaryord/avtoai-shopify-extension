import { Element } from "../../elements.js"

import styled from "../../lib2.js"

export default class ChatSection extends Element {
    constructor(container){
        const chatContainer = styled.div({
            id: "avtoai-assistant-chat-section-container",
            classes: ["avtoai-assistant-chat-scrollbar"],
            style: { 
                display: "flex",
                overflowY: "auto", 
                flexDirection: "column",
                flexGrow: "1", 
                alignItems: "flex-start",
                padding: "1.25rem" 
            }
        })

        super(container, chatContainer)

        return chatContainer
    }
}