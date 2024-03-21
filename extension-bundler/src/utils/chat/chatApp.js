import createLoadingSpinnerSVG from "../../svg/loadingIconSVG.js"

import ChatHeader from "./ui/header.js"
import ChatSection from "./ui/chat.js"
import ActionSection from "./ui/actions.js"

import styled from "../lib2.js"

import "../../styles/chat.css"

class ChatApp {
    constructor({ drawer, assistantName, assistantStarters=[], assistantImage, startInLoading=true,
         disableForMessageSent=true }) {
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
            chatSection = new ChatSection(assistantImage)
            actionSection = new ActionSection(null, assistantStarters)
            drawer.content.appendChild(loadingComponent)
        }
        else{
            chatSection = new ChatSection(assistantImage)
            actionSection = new ActionSection(drawer.content, assistantStarters)
        }

        this.container = drawer.content
        this.loading = startInLoading
        this.disableForMessageSent = disableForMessageSent

        this.sections = {
            headerSection,
            chatSection,
            actionSection,
        }
        this.loadingComponent = loadingComponent
        this.runStatus = "completed"

        actionSection.sendButton.onclick = event => this.onSend(event, actionSection)
        actionSection.starters.forEach(starter => {
            starter.onclick = event => this.onSend(event, actionSection, starter.textContent)
        }) 

        document.addEventListener("keydown", async (event) => {
            if(event.key === "Enter")
                this.onSend(event, actionSection)
        })
    }

    messageSentReady(){
        this.runStatus = "completed"
        this.sections.actionSection.sendButton.disabled = false
        this.sections.actionSection.sendButton.classList.add("avtoai-assistant-actions-send-enabled")
    }

    messageSentStarted(){
        this.runStatus = "in_process"
        this.sections.actionSection.sendButton.disabled = true
        this.sections.actionSection.sendButton.classList.remove("avtoai-assistant-actions-send-enabled")
        this.sections.chatSection.startChat()
    }


    switchToReady(){
        if(this.loading){
            this.sections.headerSection.switchToReady()

            if(this.container.contains(this.loadingComponent))
                this.container.removeChild(this.loadingComponent)

            this.container.appendChild(this.sections.chatSection.element)
            this.container.appendChild(this.sections.actionSection.content)

            this.loading = false
        }
    }

    switchToLoading(){
        if(!this.loading){
            this.sections.headerSection.switchToLoading()

            if(this.container.contains(this.sections.chatSection.element))
                this.container.removeChild(this.sections.chatSection.element)

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

    async onMessageSent(messageValue){}

    async onSend(event, actionSection, staticMessageValue) {
        if(event) event.preventDefault()

        const messageValue = staticMessageValue ? staticMessageValue : actionSection.input.value.trim()
        if(messageValue.length > 0 && this.onMessageSent && this.runStatus === "completed"){
            this.messageSentStarted()

            actionSection.input.value = ""
            await this.onMessageSent(messageValue)

            if(this.disableForMessageSent)
                this.messageSentReady()
        }
    }
}

export default ChatApp