import Elements, { Element } from "../../elements.js"

import styled from "../../lib2.js"

export default class ChatHeader extends Element {
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