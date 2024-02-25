import { configureGlobalCSSThemeVariables } from "./utils/config.js"
import { getWidgetButton, getContainer } from "./utils/static.js"

import { Drawer } from "./utils/chat/drawer.js"
import ChatApp from "./utils/chat/chatApp.js"

import api from "./api/index.js"
import { setItem, getItem } from "./store/session.js"
import { mapMessages, MessageElement, LoadingMessageElement } from "./utils/chat/messages.js"

import "./styles/style.css"
import "./styles/animations.css"
import "./styles/media-queries.css"

function setupExtension() {
    const container = getContainer()
    const widgetButton = getWidgetButton()
    
    const shopDomain = container.getAttribute("data-shop-domain")
    api.setShop(shopDomain)
    console.log(api)

    const colorTheme = container.getAttribute('data-avtoai-color-theme-app')
    const appTheme = container.getAttribute('data-avotai-theme-app')

    configureGlobalCSSThemeVariables(colorTheme, appTheme)

    const chatPosition = container.getAttribute("data-avtoai-chat-position")
    const chatImageUrl = container.getAttribute('data-avtoai-chat-image')

    container.removeAttribute('data-shop-domain')
    container.removeAttribute('data-avtoai-chat-image')

    const sideDrawer = new Drawer({
        container: container,
        position: chatPosition
    })

    const assistantName = getItem("avtoai-assistant-name")
    const app = new ChatApp({
        drawer: sideDrawer,
        assistantName: assistantName ? assistantName : "Avto AI chatbot Here to help you",
        assistantImage: chatImageUrl
    })

    app.onMessageSent = async (messageValue) => {
        const thread = getItem("avtoai-assistant-chat-thread")
        if(!thread) return

        new MessageElement(app.sections.chatSection, messageValue, "user")
        new LoadingMessageElement(app.sections.chatSection)

        const res = await api.post("/chat", {
            userMessage: messageValue,
            threadId: thread
        })

        mapMessages({
            container: app.sections.chatSection, 
            messages: res.messages.reverse(),
            staticAddedMessages: 2
        })
    }

    if(!widgetButton) return console.error("No widget button element found")

    widgetButton.onclick = async () => {
        if(!sideDrawer.isOpen){
            sideDrawer.open()
            app.switchToLoading()

            const thread = getItem("avtoai-assistant-chat-thread")
            const assistantName = getItem("avtoai-assistant-chat-name")

            if(!thread || !assistantName){
                const res = await api.get("/create/thread")

                app.sections.headerSection.setTitle(res.assistantName)

                setItem("avtoai-assistant-chat-thread", res.threadId)
                setItem("avtoai-assistant-chat-name", res.assistantName)
                setItem("avtoai-assistant-chat-starters", res.assistantStarters)
            }
            else{
                const res = await api.post("/pull/messages", { threadId: thread })
                if(res.messages)
                    mapMessages({
                        container: app.sections.chatSection, 
                        messages: res.messages.reverse(),
                    })
            }

            app.switchToReady()
        } 
        else sideDrawer.close()
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setupExtension()
})
