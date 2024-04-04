import closeIconSVG from "../../../svg/closeIconSVG.js"

import styled from "../../lib2.js"

export default class ChatHeader {
    constructor({ container, assistantName, assistantImage, startInLoading }){
        const header = styled.div({
            id: "avtoai-assistant-chat-header",
            classes: ["avtoai-assistant-chat-header"]
        })

        const content = styled.div({
            id: "avtoai-assistant-chat-header-container",
            style: { display: "flex", width: "100%", alignItems: "center" }
        })

        const closeButtonContainer = styled.div({
            id: "avtoai-assistant-chat-close-button-container",
            style: { display: "flex", flexGrow: "1", justifyContent: "end", alignItems: "center" }
        })

        header.appendChild(content)

        if(container) container.appendChild(header)

        const menu = this.createMenu()
        const closeButton = styled.div({
            id: "avtoai-assistant-header-close-button",
            classes: ["avtoai-assistant-button-opacity-hover"],
            style: {
                cursor: "pointer",
                display:"flex",
                justifyContent: "center",
                alignItems: "center",
            }
        })
        closeButton.innerHTML = closeIconSVG("var(--avtoai-assistant-colors-color-theme-text-color)", "40px", "25px")
        closeButtonContainer.appendChild(closeButton)
        const {titleContainer, titleText} = this.createTitle(assistantName, assistantImage)

        content.appendChild(menu)
        if(!startInLoading) content.appendChild(titleContainer)
        content.appendChild(closeButtonContainer)

        this.content = content
        this.titleContainer = titleContainer
        this.title = titleText

        this.closeButtonContainer = closeButtonContainer
        this.closeButton = closeButton
        this.menuButton = menu
    }

    createMenu(){
        const menuContainer = styled.div({
            id: "avtoai-assistant-chat-menu-container",
            classes: ["avtoai-assistant-chat-menu-container"]
        })

        styled.div({
            classes: ["avtoai-assistant-chat-menu-dot"],
            style: { display: "block"}
        }).clone(3).to(menuContainer)

        return menuContainer
    }

    createTitle(text, assistantImage) {
        const titleContainer = styled.div({
            id: "avtoai-assistant-chat-title-container",
            classes: ["avtoai-assistant-chat-title-container"]
        })

        const titleBlock = styled.div({
            id: "avtoai-assistant-chat-title-block",
            style: {
                display: "flex",
                alignItems: "center",
                paddingRight: "2rem"
            }
        })

        const titleIcon = document.createElement("img")
        titleIcon.loading = "lazy"
        titleIcon.src = assistantImage
        titleIcon.alt = 'avtoai-assistant-chat-bot-icon'
        const designedTitleIcon = styled.designComponent(titleIcon, {
                style: { width: "50px", height: "50px", borderRadius: "10px", 
                filter: "drop-shadow(0px 0px 1px var(--avtoai-assistant-colors-color-theme-text-color))" 
            }
        })

        const titleText = styled.h3({
            classes: ["avtoai-assistant-chat-title-text"],
            text: text
        })

        titleBlock.appendChild(designedTitleIcon)
        titleBlock.appendChild(titleText)

        titleContainer.appendChild(titleBlock)

        return { titleContainer, titleText }
    } 

    setTitle(title) {
        this.title.textContent = title
    }

    switchToReady(){
        this.content.insertBefore(this.titleContainer, this.closeButtonContainer)
        styled.designComponent(this.closeButtonContainer, {
            style: { flexGrow: "0", justifyContent: "center" }
        })
    }

    switchToLoading(){
        this.content.removeChild(this.titleContainer)
        styled.designComponent(this.closeButtonContainer, {
            style: { flexGrow: "1", justifyContent: "end" }
        })
    }
}