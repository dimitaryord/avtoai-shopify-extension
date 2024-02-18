import { configureGlobalCSSThemeVariables } from "./utils/config.js"
import WidgetElements from "./utils/widgetElements.js"
import DrawerElements from "./utils/drawerElements.js"
import ChatApp from "./utils/chatApp.js"

import api from "./api/index.js"
import { setItem, getItem } from "./store/session.js"
import { mapMessages, MessageElement, LoadingMessageElement } from "./utils/messages.js"

import "./styles/style.css"
import "./styles/animations.css"
import "./styles/media-queries.css"

function setupExtension() {
    const container = document.getElementById("avtoai-assistant-bot-container")
    
    const shopDomain = container.getAttribute("data-shop-domain")
    api.setShop(shopDomain)

    const colorTheme = container.getAttribute('data-avtoai-color-theme-app')
    const appTheme = container.getAttribute('data-avotai-theme-app')
    const widgetButtonColor = container.getAttribute("data-avtoai-widget-button-color")

    configureGlobalCSSThemeVariables(colorTheme, appTheme, widgetButtonColor)

    const chatPosition = container.getAttribute("data-avtoai-chat-position")
    const widgetButtonShadow = container.getAttribute("data-avtoai-widget-button-shadow") == "yes"
    const widgetButtonPosition = container.getAttribute("data-avtoai-widget-button-position")
    const widgetIconUrl = container.getAttribute('data-avtoai-widget-icon-url')

    container.removeAttribute('data-shop-domain')
    container.removeAttribute('data-avtoai-widget-icon-url')

    const widgetSection = new WidgetElements.WidgetSection(container, widgetButtonPosition, widgetIconUrl, widgetButtonShadow)

    const sideDrawer = new DrawerElements.SideDrawer(container, chatPosition, widgetSection)
    const app = new ChatApp({
        drawer: sideDrawer,
        assistantName: "Avto AI chatbot Here to help you",
        assistantImage: widgetIconUrl
    })

    app.onMessageSent = async (messageValue) => {
        const thread = getItem("avtoai-assistant-thread")
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


    widgetSection.button.onclick = async () => {
        if(!sideDrawer.isOpen){
            sideDrawer.open()
            app.switchToLoading()

            const thread = getItem("avtoai-assistant-thread")
            const assistantName = getItem("avtoai-assistant-name")

            if(!thread || !assistantName){
                const res = await api.post("/create/thread")

                app.sections.headerSection.setTitle(res.assistantName)

                setItem("avtoai-assistant-thread", res.threadId)
                setItem("avtoai-assistant-name", res.assistantName)
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
