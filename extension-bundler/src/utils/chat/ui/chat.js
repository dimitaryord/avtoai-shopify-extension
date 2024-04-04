import styled from "../../lib2.js"

export default class ChatSection{
    constructor(assistantImage){
        const sectionContainer = styled.div({ id: "avtoai-assistant-chat-section", style: { 
            flexGrow: "1",
            display: "flex", 
            overflowY: "hidden",
        }})


        const greetingContainer = styled.div({
            id: "avtoai-assistant-chat-section-greeting-container",
            style: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                flexGrow: "1",
                height: "80%"
            }
        })

        const greetingButton = styled.div({
            id: "avtoai-assistant-chat-section-greeting-button",
            style: {
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100px",
                height: "100px", 
                background: "rgba(137, 134, 134, 0.3)",
                borderRadius: "50%",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(20px)",
            }
        })

        const greetingIcon = document.createElement("img")
        greetingIcon.loading = "lazy"
        greetingIcon.src = assistantImage
        greetingIcon.alt = 'avtoai-assistant-chat-section-greeting-icon'
        const designedGreetingIcon = styled.designComponent(greetingIcon, {
            style: { width: "85px", height: "85px", borderRadius: "50%", 
                // filter: "drop-shadow( var(--avtoai-assistant-colors-text-color) 0.1rem 0.1rem )"
            }
        })

        const greetingTitle = styled.h3({
            id: "avtoai-assistant-chat-section-greeting-title",
            style: {
                textAlign: "center",
                color: "var(--avtoai-assistant-colors-text-color)",
                fontWeight: "bold",
                marginBlock: "0",
                marginTop: "2rem",
                fontFamily: "'Roboto Slab', sans-serif"
            },
            text: "How can i assist you with this store?"
        })

        // const greetingBody = styled.p({
        //     id: "avtoai-assistant-chat-section-greeting-body",
        //     style: {
        //         fontSize: "1.25rem",
        //         textAlign: "center",
        //         marginTop: "1rem",
        //         color: "var(--avtoai-assistant-colors-text-color)"
        //     },
        //     text: "Press the assistant button to start a voice conversation"
        // })

        const footerText = styled.p({
            id: "avtoai-assistant-chat-section-greeting-body",
            style: {
                fontSize: "1rem",
                fontWeight: "bold",
                marginTop: "0.5rem",
                color: "var(--avtoai-assistant-colors-text-color)"
            },
            text: "Powered by Avto"
        })

        greetingContainer.appendChild(greetingButton)
        greetingButton.appendChild(designedGreetingIcon)
        greetingContainer.appendChild(greetingTitle)
        // greetingContainer.appendChild(greetingBody)
        greetingContainer.appendChild(footerText)

        const chatContainer = styled.div({
            id: "avtoai-assistant-chat-section-container",
            classes: ["avtoai-assistant-chat-scrollbar"],
            style: { 
                display: "flex",
                overflowY: "auto", 
                flexDirection: "column",
                flexGrow: "1",
                alignItems: "flex-start",
                padding: "1.25rem" 
            }
        })

        
        sectionContainer.appendChild(greetingContainer)

        this.element = sectionContainer
        this.greetingContainer = greetingContainer
        this.content = chatContainer
        this.view = "greeting"
    }

    startChat(){
        if(this.view === "greeting"){
            this.element.removeChild(this.greetingContainer)
            this.element.appendChild(this.content)
            this.view = "chat"
        }
    }
}