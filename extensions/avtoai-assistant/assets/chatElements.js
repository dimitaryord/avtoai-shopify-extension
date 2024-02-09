import Elements, { Element } from "./elements.js"
import createSendButtonSVG from "./sendButton.js"
import createQuestionMarkSVG from "./questionMark.js"

import styled from "./lib2.js"

class ChatHeader extends Element {
    constructor(container, chatbotTitle, iconImage){
        const header = document.createElement("div")
        header.classList.add("avtoai-assistant-chat-header")
        header.id = "avtoai-assistant-chat-header"

        const topContainer = document.createElement("div")
        topContainer.id = "avtoai-assistant-chat-header-top-container"
        topContainer.style.display = "flex"

        const bottomContainer = document.createElement("div")
        bottomContainer.id = "avtoai-assistant-chat-header-bottom-container"
        bottomContainer.style.display = "flex"
        bottomContainer.style.flexGrow = "1"
        bottomContainer.style.alignItems = "center"
        bottomContainer.style.justifyContent = "center"

        const closeButtonContainer = document.createElement("div")
        closeButtonContainer.id = "avtoai-assistant-chat-close-button-container"
        closeButtonContainer.style.display = "flex"
        closeButtonContainer.style.flexGrow = "1"
        closeButtonContainer.style.justifyContent = "end"
        closeButtonContainer.style.alignItems = "center"

        header.appendChild(topContainer)
        header.appendChild(bottomContainer)
        super(container, header)

        const menu = this.createMenu()
        const closeElement = new Elements.ThemeCloseButton(closeButtonContainer)
        const title = this.createTitle(chatbotTitle, iconImage)

        topContainer.appendChild(menu)
        topContainer.appendChild(closeButtonContainer)

        bottomContainer.appendChild(title)

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

    createTitle(text, iconImage) {
        const titleContainer = document.createElement("div")
        titleContainer.classList.add("avtoai-assistant-chat-title-container")
        titleContainer.id = "avtoai-assistant-chat-title-container"

        const titleIcon = document.createElement("img")
        titleIcon.src = iconImage
        titleIcon.alt = 'avtoai-assistant-chat-bot-icon'
        titleIcon.style.width = "50px"
        titleIcon.style.height = "50px"
        titleIcon.style.borderRadius = "50%"

        const titleText = document.createElement("h2")
        titleText.classList.add("avtoai-assistant-chat-title-text")
        titleText.textContent = text
        

        titleContainer.appendChild(titleIcon)
        titleContainer.appendChild(titleText)

        return titleContainer
    } 
}

class ChatSection extends Element {
    constructor(container){
        const chatContainer = document.createElement("div")
        chatContainer.classList.add("avtoai-assistant-chat-section-container")
        chatContainer.id = "avtoai-assistant-chat-section-container"
        chatContainer.style.display = "flex"

        super(container, chatContainer)
    }
}

class ActionSection extends Element {
    constructor(container){
        const actionContainer = document.createElement("div")
        actionContainer.classList.add("avtoai-assistant-action-section-container")
        actionContainer.style.display = "flex"

        const startersButtonContainer = document.createElement("div")
        startersButtonContainer.classList.add("avtoai-assistant-actions-starters-button-container")
        startersButtonContainer.innerHTML = createQuestionMarkSVG("var(--avtoai-assistant-colors-color-theme-text-color)")
        startersButtonContainer.id = "avtoai-assistant-actions-starters-button-container"

        const inputButtonContainer = document.createElement("div")
        inputButtonContainer.classList.add("avtoai-assistant-actions-input-container")
        inputButtonContainer.id = "avtoai-assistant-actions-input-container"

        const input = document.createElement("input")
        input.id = "avtoai-assistant-actions-input"
        input.classList.add("avtoai-assistant-actions-input")
        input.placeholder = "Chat here..."
        inputButtonContainer.appendChild(input)

        const sendButton = document.createElement("div")
        sendButton.innerHTML = createSendButtonSVG("var(--avtoai-assistant-colors-color-theme-text-color)")
        sendButton.classList.add("avtoai-assistant-actions-send")
        inputButtonContainer.appendChild(sendButton)

        actionContainer.appendChild(startersButtonContainer)
        actionContainer.appendChild(inputButtonContainer)

        super(container, actionContainer)
    }
}

class Message extends Element {
    constructor(container, messageText) {
        const messageContainer = styled.div({
            id: "avtoai-assistant-message-container",
            style: {
                width: "80%",
                
            }
        })
    }
}

export default {
    ChatHeader,
    ChatSection, 
    ActionSection,
    Message
}