import Elements, { Element } from "./elements.js"
import createSendButtonSVG from "../svg/sendButtonSVG.js"
import createQuestionMarkSVG from "../svg/questionMarkSVG.js"
import createLoadingSpinnerSVG from "../svg/loadingIconSVG.js"

import styled from "./lib2.js"

import "../styles/chat.css"

export class ChatHeader extends Element {
    constructor({ container, assistantName, assistantImage, startInLoading }){
        const header = styled.div({
            id: "avtoai-assistant-chat-header",
            classes: ["avtoai-assistant-chat-header"]
        })

        const topContainer = styled.div({
            id: "avtoai-assistant-chat-header-top-container",
            style: { display: "flex" }
        })

        const bottomContainer = styled.div({
            id: "avtoai-assistant-chat-header-bottom-container",
            style: { display: "flex", flexGrow: "1", alignItems: "center", justifyContent: "center" }
        })

        const closeButtonContainer = styled.div({
            id: "avtoai-assistant-chat-close-button-container",
            style: { display: "flex", flexGrow: "1", alignItems: "center", justifyContent: "end" }
        })

        header.appendChild(topContainer)
        header.appendChild(bottomContainer)

        super(container, header)

        const menu = this.createMenu()
        const closeElement = new Elements.ThemeCloseButton(closeButtonContainer)
        const {titleContainer, titleText} = this.createTitle(assistantName, assistantImage)

        topContainer.appendChild(menu)
        topContainer.appendChild(closeButtonContainer)

        if(!startInLoading)
            bottomContainer.appendChild(titleContainer)

        this.bottomContainer = bottomContainer
        this.titleContainer = titleContainer
        this.title = titleText

        this.closeButton = closeElement.closeButton
    }

    createMenu(){
        const menuContainer = document.createElement("div")
        menuContainer.classList.add("avtoai-assistant-chat-menu-container")
        menuContainer.id = "avtoai-assistant-chat-menu-container"

        for(let i = 0; i < 3; i++){
            const dot = document.createElement("div")
            dot.style.display = "block"
            dot.classList.add("avtoai-assistant-chat-menu-dot")
            menuContainer.appendChild(dot)
        }

        return menuContainer
    }

    createTitle(text, assistantImage) {
        const titleContainer = styled.div({
            id: "avtoai-assistant-chat-title-container",
            classes: ["avtoai-assistant-chat-title-container"]
        })

        const titleIcon = document.createElement("img")
        titleIcon.loading = "lazy"
        titleIcon.src = assistantImage
        titleIcon.alt = 'avtoai-assistant-chat-bot-icon'
        const designedTitleIcon = styled.designComponent(titleIcon, {
            style: { width: "50px", height: "50px", borderRadius: "10px", 
                filter: "drop-shadow( var(--avtoai-assistant-colors-widget-box-shadow) 0.1rem 0.1rem )"
            }
        })

        const titleText = styled.h3({
            classes: ["avtoai-assistant-chat-title-text"],
            text: text
        })

        titleContainer.appendChild(designedTitleIcon)
        titleContainer.appendChild(titleText)

        return { titleContainer, titleText }
    } 

    setTitle(title) {
        this.title.textContent = title
    }

    switchToReady(){
        this.bottomContainer.appendChild(this.titleContainer)
    }

    switchToLoading(){
        this.bottomContainer.removeChild(this.titleContainer)
    }
}

export class ChatSection extends Element {
    constructor(container){
        const chatContainer = styled.div({
            id: "avtoai-assistant-chat-section-container",
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

export class ActionSection extends Element {
    constructor(container){
        const actionContainer = styled.div({
            id: "avtoai-assistant-actions-container",
            classes: ["avtoai-assistant-action-section-container"],
            style: {display: "flex" }
        })

        const startersButtonContainer = styled.div({
            id: "avtoai-assistant-actions-starters-button-container",
            classes: ["avtoai-assistant-actions-starters-button-container"]
        })
        startersButtonContainer.innerHTML = 
            createQuestionMarkSVG("var(--avtoai-assistant-colors-color-theme-text-color)")

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
            classes: ["avtoai-assistant-actions-send"]
        })
        sendButton.innerHTML = createSendButtonSVG("var(--avtoai-assistant-colors-color-theme-text-color)")
        inputButtonContainer.appendChild(sendButton)

        actionContainer.appendChild(startersButtonContainer)
        actionContainer.appendChild(inputButtonContainer)

        super(container, actionContainer)

        this.input = input
        this.sendButton = sendButton
        this.content = actionContainer
    }
}

class ChatApp {
    constructor({ drawer, assistantName, assistantImage, startInLoading=true }) {
        const headerSection = new ChatHeader({
            container: drawer.content,
            assistantName: assistantName,
            assistantImage: assistantImage,
            startInLoading: startInLoading
        })
        headerSection.closeButton.onclick = () => drawer.close()

        let chatSection, actionSection, loadingComponent

        loadingComponent = this.createLoadingComponent()

        if(startInLoading){
            chatSection = new ChatSection(null)
            actionSection = new ActionSection(null)
            drawer.content.appendChild(loadingComponent)
        }
        else{
            chatSection = new ChatSection(drawer.content)
            actionSection = new ActionSection(drawer.content)
        }

        this.container = drawer.content
        this.loading = startInLoading

        this.sections = {
            headerSection,
            chatSection,
            actionSection,
        }
        this.loadingComponent = loadingComponent

        actionSection.sendButton.onclick = event => this.onSend(event, actionSection)

        document.addEventListener("keydown", async (event) => {
            if(event.key === "Enter")
                this.onSend(event, actionSection)
        })
    }

    switchToReady(){
        if(this.loading){
            this.sections.headerSection.switchToReady()

            if(this.container.contains(this.loadingComponent))
                this.container.removeChild(this.loadingComponent)

            this.container.appendChild(this.sections.chatSection)
            this.container.appendChild(this.sections.actionSection.content)

            this.loading = false
        }
    }

    switchToLoading(){
        if(!this.loading){
            this.sections.headerSection.switchToLoading()

            if(this.container.contains(this.sections.chatSection))
                this.container.removeChild(this.sections.chatSection)

            if(this.container.contains(this.sections.actionSection.content))
                this.container.removeChild(this.sections.actionSection.content)

            this.container.appendChild(this.loadingComponent)

            this.loading = true
        }
    }

    createLoadingComponent(){
        const loadingContainer = styled.div({
            id: "avtoai-assistant-chat-app-loading-container",
            style: { 
                width: "100%", 
                height: "100%", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center"
            }
        })
        
        const loadingComponent = styled.div({
            id: "avtoai-assistant-chat-app-loading",
            style: { animation: "avtoai-assistant-spin 2s linear infinite", height: "60px" }
        })

        loadingComponent.innerHTML = createLoadingSpinnerSVG(
            "var(--avtoai-assistant-colors-color-theme)",
            "60px", "60px"
        )

        loadingContainer.appendChild(loadingComponent)
        return loadingContainer
    }

    async onSend(event, actionSection) {
        if(event) event.preventDefault()

        const messageValue = actionSection.input.value.trim()
        if(messageValue.length > 0 && this.onMessageSent){
            this.sections.actionSection.sendButton.disabled = true
            styled.designComponent(this.sections.actionSection.sendButton, {
                style: {
                    cursor: "default"
                }
            })

            actionSection.input.value = ""
            await this.onMessageSent(messageValue)

            this.sections.actionSection.sendButton.disabled = false
            styled.designComponent(this.sections.actionSection.sendButton, {
                style: {
                    cursor: "pointer"
                }
            })
        }
    }
}

export default ChatApp