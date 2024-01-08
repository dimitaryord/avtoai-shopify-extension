import ProductObserver from "./productObserver.js"
import { configureGlobalCSSThemeVariables } from "./config.js"
import WidgetElements from "./widgetElements.js"
import DrawerElements from "./drawerElements.js"
import ChatElements from "./chatElements.js"
import Elements from "./elements.js"

function setupExtension() {
    const container = document.getElementById("avtoai-assistant-bot-container")

    const colorTheme = container.getAttribute('data-avtoai-color-theme-app')
    const appTheme = container.getAttribute('data-avotai-theme-app')
    const widgetButtonColor = container.getAttribute("data-avtoai-widget-button-color")

    configureGlobalCSSThemeVariables(colorTheme, appTheme, widgetButtonColor)

    const chatPosition = container.getAttribute("data-avtoai-chat-position")
    const widgetButtonShadow = container.getAttribute("data-avtoai-widget-button-shadow") == "yes"
    const widgetButtonPosition = container.getAttribute("data-avtoai-widget-button-position")
    const widgetIconUrl = container.getAttribute('data-avtoai-widget-icon-url')

    container.removeAttribute('data-avtoai-widget-icon-url')

    const widgetSection = new WidgetElements.WidgetSection(container, widgetButtonPosition, widgetIconUrl, widgetButtonShadow)

    const sideDrawer = new DrawerElements.SideDrawer(container, chatPosition, widgetSection)
    const headerSection = new ChatElements.ChatHeader(sideDrawer.content, "Avto AI Chatbot", widgetIconUrl)
    headerSection.closeButton.onclick = () => sideDrawer.close()

    const chatSection = new ChatElements.ChatSection(sideDrawer.content)
    const actionSection = new ChatElements.ActionSection(sideDrawer.content)

    widgetSection.button.onclick = () => {
        if(!sideDrawer.isOpen) 
            sideDrawer.open()
        else 
            sideDrawer.close()
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setupExtension()
})
