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

class ButtonElement extends Element {
    constructor(container, text, appTheme, colorTheme) {
        const button = document.createElement("button")

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
    ThemeCloseButton,
    ConditionalRendering
}