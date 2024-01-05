import Elements, { Element } from "./elements.js"

class WidgetSection extends Element {
    constructor(container, position, iconImageUrl, shadow) {
        const widgetContainer = document.createElement('div')
        widgetContainer.classList.add(`avtoai-assistant-widget-container-position-${position}`)
        widgetContainer.classList.add("avtoai-assistant-widget-container")

        const topWidgetContainer = document.createElement('div')
        topWidgetContainer.id = "avtoai-assistant-top-widget-container"
        new Elements.TextP(topWidgetContainer, "Click Here To Chat", true)

        const widgetButtonContainer = document.createElement('div')
        widgetButtonContainer.id = "avtoai-assistant-widget-button-container"
        widgetButtonContainer.classList.add("avtoai-assistant-widget-button-container")

        widgetContainer.appendChild(topWidgetContainer)
        widgetContainer.appendChild(widgetButtonContainer)

        super(container, widgetContainer)

        const [widgetButtonElement, widgetOpenButton, animatedComponents] = this.createChatBubble(iconImageUrl, shadow)
        widgetButtonContainer.appendChild(widgetButtonElement)
        
        this.animatedComponents = animatedComponents
        this.widgetButtonPosition = position
        this.button = widgetOpenButton
    }

    playAnimation(direction="normal") {
        const [component, componentBorder] = this.animatedComponents

        if(this.widgetButtonPosition.includes("right")){
            component.style.transformOrigin = "0% 100%"
            componentBorder.style.transformOrigin = "0% 100%"
            this.playElementAnimation
                (component, "avtoai-assistant-widget-button-click-animation-right 0.4s forwards", direction)
            this.playElementAnimation
                (componentBorder, "avtoai-assistant-widget-button-border-click-animation-right 0.4s forwards", direction)
        }
        else if(this.widgetButtonPosition.includes("left")){
            component.style.transformOrigin = "0% 0%"
            componentBorder.style.transformOrigin = "0% 0%"
            this.playElementAnimation
                (component, "avtoai-assistant-widget-button-click-animation-left 0.4s forwards", direction)
            this.playElementAnimation
                (componentBorder, "avtoai-assistant-widget-button-border-click-animation-left 0.4s forwards", direction)
        }
    }

    createChatBubble(iconImageUrl, shadow){
        const parentElement = document.createElement('div')
        parentElement.classList.add('avtoai-assistant-chat-bubble-parent-element')

        const triangleContainer = document.createElement('div')
        triangleContainer.classList.add('avtoai-assistant-chat-bubble-triangle-container')

        const triangle = document.createElement('div')
        triangle.classList.add('avtoai-assistant-chat-bubble-triangle')
        triangle.style.display = 'block'

        const triangleBorder = document.createElement('div')
        triangleBorder.classList.add('avtoai-assistant-chat-bubble-triangle-border')
        triangleBorder.style.display = 'block'

        const oval = document.createElement('div')
        oval.classList.add('avtoai-assistant-chat-bubble-oval')

        if(shadow) 
            oval.style.boxShadow = "14px 14px 20px var(--avtoai-assistant-colors-widget-box-shadow)"
        
        const widgetImage = document.createElement('img')
        widgetImage.src = iconImageUrl
        widgetImage.alt = 'avtoai-assistant-widget-image'
        widgetImage.style.width = "45px"
        widgetImage.style.height = "45px"
        widgetImage.style.borderRadius = "50%"


        oval.appendChild(widgetImage)
        triangleContainer.appendChild(triangle)
        triangleContainer.appendChild(triangleBorder)
        parentElement.appendChild(triangleContainer)
        parentElement.appendChild(oval)

        return [parentElement, oval, [triangle, triangleBorder]]
    }
}

export default {
    WidgetSection
}