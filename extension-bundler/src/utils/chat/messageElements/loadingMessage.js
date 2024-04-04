import { Message } from "./messageElement"
import createLoadingSpinnerSVG from "../../../svg/loadingIconSVG.js"
import styled from "../../lib2.js"

export class LoadingMessageElement extends Message {
    constructor(container){
        const loadingComponent = styled.div({
            id: "avtoai-assistant-chat-app-message-loading",
            style: { animation: "avtoai-assistant-spin 2s linear infinite", height: "30px" }
        })

        loadingComponent.innerHTML = createLoadingSpinnerSVG(
            "var(--avtoai-assistant-colors-color-theme)",
            "30px", "30px"
        )

        super("", "assistant", loadingComponent, { paddingBlock: true })
        container.appendChild(this.content)
    }
}