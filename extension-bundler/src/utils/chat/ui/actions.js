import createSendButtonSVG from "../../../svg/sendButtonSVG.js"
import createQuestionMarkSVG from "../../../svg/questionMarkSVG.js"
import createChatIconSVG from "../../../svg/chatIconSVG.js"

import styled from "../../lib2.js"

export default class ActionSection{
    constructor(assistantStarters){
        const actionContainer = styled.div({
            id: "avtoai-assistant-actions-container",
            classes: ["avtoai-assistant-action-section-container"],
            style: {display: "flex" }
        })

        const startersButtonContainer = styled.div({
            id: "avtoai-assistant-actions-starters-button-container",
            classes: ["avtoai-assistant-actions-starters-button-container"],
        }).to(actionContainer)
        const startersIcon = createQuestionMarkSVG("var(--avtoai-assistant-colors-color-theme-text-color)")
        const chatIcon = createChatIconSVG("var(--avtoai-assistant-colors-color-theme-text-color)")
        startersButtonContainer.innerHTML = startersIcon

        const inputButtonContainer = styled.div({
            id: "avtoai-assistant-actions-input-container",
            classes: ["avtoai-assistant-actions-input-container"]
        }).to(actionContainer)

        const input = styled.textarea({
            id: "avtoai-assistant-actions-input",
            classes: ["avtoai-assistant-actions-input", "avtoai-assistant-textarea-scrollbar"]
        }).to(inputButtonContainer)
        input.placeholder = "Chat here..."

        this.setHeightAuto = () => {
            if(input.style.height > input.style.maxHeight)
                input.style.overflowY = "scroll"
            else if(input.style.height < input.style.maxHeight)
                input.style.overflowY = "hidden"


            if(input.value.includes('\n') || (input.scrollHeight !== 39 && input.scrollHeight !== 51)){
                input.style.height = "auto"
                input.style.height = input.scrollHeight + 'px'
                input.scrollTo(0, input.scrollHeight)
            }
            else input.style.height = null

            if(input.value.trim().length !== 0)
                sendButton.style.display = "flex"
            else{
                sendButton.style.display = "none"
                if(!input.value.includes('\n')) 
                    input.style.height = null
            } 
        }
        input.addEventListener("input", this.setHeightAuto, false)

        // const startConversationButton = styled.div({

        // })

        const sendButton = styled.div({
            id: "avtoai-assistant-actions-send-button",
            classes: ["avtoai-assistant-actions-send", "avtoai-assistant-actions-send-enabled"],
            style: { display: "none" }
        }).to(inputButtonContainer)
        sendButton.innerHTML = createSendButtonSVG("var(--avtoai-assistant-colors-text-color)", "avtoai-assistant-actions-send-icon")

        const starters = this.createStarters(assistantStarters)
        
        this.mode = "chat"
        this.input = input
        this.sendButton = sendButton
        this.content = actionContainer
        this.starters = Array.from(starters.children)
        this.startersContent = starters

        startersButtonContainer.onclick = () => {
            if(this.mode === "chat") {
                actionContainer.removeChild(inputButtonContainer)
                actionContainer.appendChild(this.startersContent)
                startersButtonContainer.innerHTML = chatIcon
                this.mode = "starters"
            }
            else if (this.mode === "starters"){
                actionContainer.removeChild(this.startersContent)
                actionContainer.appendChild(inputButtonContainer)
                startersButtonContainer.innerHTML = startersIcon
                this.mode = "chat"
            }
        }

        input.onfocus = () => {
            if(actionContainer.contains(startersButtonContainer)){
                actionContainer.removeChild(startersButtonContainer)
                inputButtonContainer.style.left = "0px"
            }
        }
        input.onblur = () => {
            if(actionContainer.contains(this.startersContent))
                actionContainer.insertBefore(startersButtonContainer, this.startersContent)
            else if(actionContainer.contains(inputButtonContainer))
                actionContainer.insertBefore(startersButtonContainer, inputButtonContainer)
            inputButtonContainer.style.left = "0.5rem"
        }

    }

    setStarters(starters){
        const newStarters = this.createStarters(starters)
        if(this.content.contains(this.startersContent)){
            this.content.insertBefore(newStarters, this.startersContent)
            this.content.removeChild(this.startersContent)
        }
        this.starters = Array.from(newStarters.children)
        this.startersContent = newStarters
    }

    createStarters(starters) {
        const startersContainer = styled.div({
            id: "avtoai-assistant-chat-actions-starters-container",
            classes: ["avtoai-assistant-chat-scrollbar"],
            style: {
                width: "90%",
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

        for(let starter of starters.filter(starter => starter.trim() !== "")) {
            const starterElement = styled.div({
                id: "avtoai-assistant-chat-actions-starter",
                classes: ["avtoai-assistant-chat-actions-starter"],
                style: {
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    height: "50px",
                    textWrap: "nowrap",
                    width: "fit-content",
                    padding: "1rem",
                    fontSize: "14px",
                    borderRadius: "25px",
                    color: "var(--avtoai-assistant-colors-color-theme-text-color)",
                    backgroundColor: "var(--avtoai-assistant-colors-color-theme)",
                    border: "var(--avtoai-assistant-colors-widget-box-border) solid 1px",
                    boxShadow: "var(--avtoai-assistant-colors-color-border-shadow) 0.1rem 0.1rem",
                },
                text: starter
            })


            startersContainer.appendChild(starterElement)
        }
        return startersContainer
    }
}