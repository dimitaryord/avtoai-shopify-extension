import { Element } from "./elements.js"

class chatHeader extends Element {
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