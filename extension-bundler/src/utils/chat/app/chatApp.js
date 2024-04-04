import createLoadingSpinnerSVG from "../../../svg/loadingIconSVG.js"

import ChatHeader from "../ui/header.js"
import ChatSection from "../ui/chat.js"
import ActionSection from "../ui/actions.js"

import Settings from "../ui/settings.js"

import styled from "../../lib2.js"
import { PageEngine } from "./pageEngine.js"

import "../../../styles/chat.css"

class ChatApp {
    constructor({ drawer, assistantName, assistantStarters=[], assistantImage, startInLoading=true,
         disableForMessageSent=true }, { defaultTheme }) {

        this.pageEngine = new PageEngine(drawer.content, { 
            defaultPage: startInLoading ? "loading" : "chat" 
        })

        const settings = new Settings(() => this.pageEngine.back(), { defaultTheme: defaultTheme })
        this.pageEngine.createPage("settings", settings.content)

        const headerSection = new ChatHeader({
            container: drawer.content,
            assistantName: assistantName,
            assistantImage: assistantImage,
            startInLoading: startInLoading
        })
        headerSection.closeButton.onclick = () => drawer.close()
        headerSection.menuButton.onclick = () => {
            if(this.pageEngine.currentPage === "chat") 
                this.pageEngine.changePage("settings")
            else if(this.pageEngine.currentPage === "settings")
                this.pageEngine.changePage("chat")
        }

        const loadingComponent = this.createLoadingComponent()
        this.pageEngine.createPage("loading", loadingComponent)

        const chatSection = new ChatSection(assistantImage)
        const actionSection = new ActionSection(assistantStarters)
        this.pageEngine.createPage("chat", chatSection.element, actionSection.content)

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
        for(let starter of actionSection.starters)
            starter.onclick = event => this.onSend(event, actionSection, starter.textContent)

        actionSection.input.addEventListener("keydown", async (event) => {
            if(event.shiftKey && (event.key === "Enter" || event.keyCode === 13)){
                event.preventDefault()

                const start = actionSection.input.selectionStart
                const end = actionSection.input.selectionEnd

                actionSection.input.value = 
                    actionSection.input.value.substring(0, start) + "\n" + actionSection.input.value.substring(end)

                actionSection.input.selectionStart = actionSection.input.selectionEnd = start + 1
                actionSection.setHeightAuto()
            }
            else if(event.key === "Enter") this.onSend(event, actionSection)
        })
    }

    setStarters(starters){
        this.sections.actionSection.setStarters(starters)
        for(let starter of this.sections.actionSection.starters)
            starter.onclick = event => this.onSend(event, this.sections.actionSection, starter.textContent)
    }

    setTitle(title){
        this.sections.headerSection.setTitle(title)
    }

    messageSentReady(){
        this.runStatus = "completed"
        this.sections.actionSection.sendButton.disabled = false
        this.sections.actionSection.sendButton.classList.add("avtoai-assistant-actions-send-enabled")
        this.sections.actionSection.sendButton.style.display = "none"
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
            this.pageEngine.changePage("chat")
            this.loading = false
        }
    }

    switchToLoading(){
        if(!this.loading){
            this.sections.headerSection.switchToLoading()
            this.pageEngine.changePage("loading")
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
        }).to(loadingContainer)

        loadingComponent.innerHTML = createLoadingSpinnerSVG(
            "var(--avtoai-assistant-colors-color-theme)",
            "60px", "60px"
        )

        return loadingContainer
    }

    async onMessageSent(messageValue){}

    async onSend(event, actionSection, staticMessageValue) {
        if(event) event.preventDefault()

        const messageValue = staticMessageValue ? staticMessageValue : actionSection.input.value.trim()
        if(messageValue.length > 0 && this.onMessageSent && this.runStatus === "completed"){
            this.messageSentStarted()

            actionSection.input.value = ""
            actionSection.setHeightAuto()
            await this.onMessageSent(messageValue)

            if(this.disableForMessageSent)
                this.messageSentReady()
        }
    }
}

export default ChatApp