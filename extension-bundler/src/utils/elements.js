import styled from "./lib2"

export class Element {
    constructor(container, element) {
        if(container)
            container.appendChild(element)
    }

    playElementAnimation(element, animation, direction) {
        element.style.animation = ""
        void element.offsetWidth
        element.style.animation = animation + " " + direction
    }
}

class TextP extends Element {
    constructor(container, text, shadow){
        const p = document.createElement('p')
        p.classList.add(shadow ? "avtoai-assistant-p-text-shadow" : "avtoai-assistant-p-text")
        p.textContent = text
        super(container, p)
    }
}

class ThemeTextP extends Element {

}

class ThemeHeading extends Element {

}

class ThemeButton extends Element {
    constructor(container, text) {
        const button = styled.button({
            id: "avtoai-assistant-theme-button",
            style: {
                cursor: "pointer",
                width: "fit-content",
                fontSize: "1.5rem",
                marginBottom: "1.25rem",
                paddingBlock: "2rem",
                paddingInline: "2.25rem",
                borderRadius: "10px",
                border: "none",
                color: "var(--avtoai-assistant-colors-color-theme-text-color)",
                backgroundColor: "var(--avtoai-assistant-colors-color-theme)",
            },
            text: text
        })
        super(container, button)

        return button
    }
}
class ThemeCloseButton extends Element {
    constructor(container){
        const buttonContainer = document.createElement("div")
        buttonContainer.classList.add("avtoai-assistant-theme-close-button-container")
        buttonContainer.id = "avtoai-assistant-theme-close-button-container"

        for(let i = 0; i < 2; i++){
            const cross = document.createElement("div")
            cross.classList.add("avtoai-assistant-theme-close-button-cross")
            cross.style.display = "block"
            buttonContainer.appendChild(cross)
        }

        super(container, buttonContainer)
        this.closeButton = buttonContainer
    }
}


class ConditionalRendering{
    constructor(condition) {
        if(!condition) return null
        const parentDiv = document.createElement("div")
        parentDiv.id = "avtoai-conditional-rendering-element"
        return parentDiv
    }
} 

export default {
    TextP,
    ThemeButton,
    ThemeCloseButton,
    ConditionalRendering
}