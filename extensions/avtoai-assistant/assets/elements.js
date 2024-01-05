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


class HeaderSection extends Element {
    constructor(container, flexDirection="column"){
        const header = document.createElement("div")
        header.classList.add("avtoai-assistant-chat-header")
        header.style.display = "flex"
        header.style.flexDirection = flexDirection
        header.id = "avtoai-assistant-header"
        super(container, header)
        return header
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
    HeaderSection,
    TextP,
    ConditionalRendering
}