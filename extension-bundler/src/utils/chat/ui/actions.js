import { Element } from "../../elements.js"
import createSendButtonSVG from "../../../svg/sendButtonSVG.js"
import createQuestionMarkSVG from "../../../svg/questionMarkSVG.js"
import createChatIconSVG from "../../../svg/chatIconSVG.js"

import styled from "../../lib2.js"

export default class ActionSection extends Element {
    constructor(container, assistantStarters){
        const actionContainer = styled.div({
            id: "avtoai-assistant-actions-container",
            classes: ["avtoai-assistant-action-section-container"],
            style: {display: "flex" }
        })

        const startersButtonContainer = styled.div({
            id: "avtoai-assistant-actions-starters-button-container",
            classes: ["avtoai-assistant-actions-starters-button-container"],
        })
        const startersIcon = createQuestionMarkSVG("var(--avtoai-assistant-colors-color-theme-text-color)")
        const chatIcon = createChatIconSVG("var(--avtoai-assistant-colors-color-theme-text-color)")
        startersButtonContainer.innerHTML = startersIcon

        const inputButtonContainer = styled.div({
            id: "avtoai-assistant-actions-input-container",
            classes: ["avtoai-assistant-actions-input-container"]
        })

        const input = styled.input({
            id: "avtoai-assistant-actions-input",
            classes: ["avtoai-assistant-actions-input"]
        })
        input.placeholder = "Chat here"
        inputButtonContainer.appendChild(input)

        const sendButton = styled.div({
            classes: ["avtoai-assistant-actions-send", "avtoai-assistant-actions-send-enabled"]
        })
        sendButton.innerHTML = createSendButtonSVG("var(--avtoai-assistant-colors-color-theme-text-color)")
        inputButtonContainer.appendChild(sendButton)

        actionContainer.appendChild(startersButtonContainer)
        actionContainer.appendChild(inputButtonContainer)

        super(container, actionContainer)

        const starters = this.createStarters(assistantStarters)
        
        this.mode = "chat"
        this.input = input
        this.sendButton = sendButton
        this.content = actionContainer
        this.starters = Array.from(starters.children)

        startersButtonContainer.onclick = () => {
            if(this.mode === "chat") {
                actionContainer.removeChild(inputButtonContainer)
                actionContainer.appendChild(starters)
                startersButtonContainer.innerHTML = chatIcon
                this.mode = "starters"
            }
            else if (this.mode === "starters"){
                actionContainer.removeChild(starters)
                actionContainer.appendChild(inputButtonContainer)
                startersButtonContainer.innerHTML = startersIcon
                this.mode = "chat"
            }
        }

    }

    createStarters(starters) {
        const startersContainer = styled.div({
            id: "avtoai-assistant-chat-actions-starters-container",
            classes: ["avtoai-assistant-chat-scrollbar"],
            style: {
                width: "80%",
                flexGrow: "1",
                display: "flex",
                overflowY: "hidden",
                overflowX: "auto",
                gap: ".25rem",
                paddingBlock: ".5rem",
                marginInline: ".5rem"
            }
        })
        startersContainer.addEventListener("wheel", (event) => {
            event.preventDefault()
            startersContainer.scrollLeft += event.deltaY * 0.5
        })

        for(let starter of starters) {
            const starterElement = styled.div({
                id: "avtoai-assistant-chat-actions-starter",
                classes: ["avtoai-assistant-chat-actions-starter"],
                style: {
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    height: "55px",
                    textWrap: "nowrap",
                    width: "fit-content",
                    padding: "1rem",
                    fontSize: "14px",
                    borderRadius: "10px",
                    color: "var(--avtoai-assistant-colors-color-theme-text-color)",
                    backgroundColor: "var(--avtoai-assistant-colors-color-theme)",
                    border: "var(--avtoai-assistant-colors-widget-box-border) solid 1px",
                    boxShadow: "var(--avtoai-assistant-colors-widget-box-shadow) 0.1rem 0.1rem",
                },
                text: starter
            })


            startersContainer.appendChild(starterElement)
        }
        return startersContainer
    }
}