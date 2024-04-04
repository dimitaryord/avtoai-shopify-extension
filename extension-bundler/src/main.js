import { configureGlobalCSSThemeVariables } from "./utils/config.js"
import { getWidgetButton, getContainer } from "./utils/static.js"

import { Drawer } from "./utils/chat/drawer.js"
import ChatApp from "./utils/chat/app/chatApp.js"

import api from "./api/index.js"
import { connectWebSocket } from "./api/ws.js"

import { setItem, getItem } from "./store/session.js"
import { mapMessages } from "./utils/chat/messages.js"
import { fetchProductAndVariantDetails } from "./api/ajax.js"
import { MessageElement, LoadingMessageElement, ProductInfoMessage } from "./utils/chat/messageElements/index.js"

import "./styles/style.css"
import "./styles/animations.css"
import "./styles/media-queries.css"

async function setupExtension() {
    const container = getContainer()
    const widgetButton = getWidgetButton()

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

    const assistantName = getItem("avtoai-assistant-chat-name")
    const assistantStarters = getItem("avtoai-assistant-chat-starters")

    /** 
    * @type {WebSocket}
    */
    let websocket
    /** 
    * @type {LoadingMessageElement}
    */
    let writer

    const app = new ChatApp({
        drawer: sideDrawer,
        assistantName: assistantName ? assistantName : "Avto AI chatbot Here to help you",
        assistantStarters: assistantStarters ? assistantStarters : ["What does this shop sell?"],
        assistantImage: chatImageUrl,
        disableForMessageSent: false,
    }, { defaultTheme: appTheme })



    app.onMessageSent = async (messageValue) => {
        const thread = getItem("avtoai-assistant-chat-thread")
        if (!thread) return

        new MessageElement(app.sections.chatSection.content, messageValue, "user")
        writer = new LoadingMessageElement(app.sections.chatSection.content)

        app.sections.chatSection.content.lastChild.scrollIntoView({
            behavior: "smooth",
            block: "end"
        })

        if(websocket) websocket.send(messageValue)
        else console.error("No websocket connection")
    }


    if (!widgetButton) return console.error("No widget button element found")

    widgetButton.onclick = async () => {
        if (!sideDrawer.isOpen) {
            sideDrawer.open()
            app.switchToLoading()

            let accessUrl
            const thread = getItem("avtoai-assistant-chat-thread")

            if (!thread) {
                const res = await api.get("/create/thread")

                app.setTitle(res.assistantName)
                app.setStarters(res.assistantStarters)

                accessUrl = res.accessUrl

                setItem("avtoai-assistant-chat-thread", res.threadId)
                setItem("avtoai-assistant-chat-name", res.assistantName)
                setItem("avtoai-assistant-chat-starters", res.assistantStarters)
            }
            else {
                const res = await api.post("/pull/messages", { thread_id: thread })
                accessUrl = res.accessUrl

                if (res.messages && res.messages.length > 0) {
                    app.sections.chatSection.startChat()

                    mapMessages({
                        container: app.sections.chatSection.content,
                        messages: res.messages.reverse(),
                        cache: getItem("avtoai-assistant-chat-cache")
                    })
                }

            }
            
            if(accessUrl){
                websocket = await connectWebSocket(accessUrl)
                app.switchToReady()


                websocket.onmessage = async (message) => {
                    const messageData = JSON.parse(message.data)
                    if (messageData.status === "running" && messageData.step === "message_creation") {
                        if(writer) writer.updateMessage((currentText) => currentText + messageData.chunk)
                    }
                    else if(messageData.status === "created" && messageData.step === "message_creation"){
                        if(!writer || !writer.isEmpty())
                            writer = new LoadingMessageElement(app.sections.chatSection.content)
                    }
                    else if(messageData.status === "completed" && messageData.step === "no_step"){
                        app.messageSentReady()
                    }
                    else if(messageData.status === "created" && messageData.step === "code_interpreter"){
                        if(!writer || !writer.isEmpty())
                            writer = new LoadingMessageElement(app.sections.chatSection.content)
                    }
                    else if(messageData.status === "done" && messageData.step === "code_interpreter"){
                        const products = await fetchProductAndVariantDetails(messageData.code)
                        let productsCache = []

                        products.forEach(product =>
                            productsCache.push(new ProductInfoMessage(app.sections.chatSection.content, product).data)
                        )

                        setItem("avtoai-assistant-chat-cache", (currentValue) => [...currentValue, ...productsCache], [])
                    }
                }
            }
            else console.error("No access url")

        }
        else sideDrawer.close()

    }
}

document.addEventListener('DOMContentLoaded', () => {
    setupExtension()
})
