import Elements, { Element } from "./elements.js"
import styled from "./lib2.js"
import createLoadingSpinnerSVG from "../svg/loadingIconSVG.js"

import { fetchProductAndVariantDetails, addItemToCart } from "../api/ajax.js"


export class Message {
    constructor(messageText, role, innerContent) {
        const messageContainer = styled.div({
            id: "avtoai-assistant-message-container",
            style: {
                maxWidth: "80%",
                borderRadius: "10px",
                paddingInline: "1.25rem",
                marginBottom: "1.5rem",
                alignSelf: role === "assistant" ? "flex-start" : "flex-end",
                backgroundColor: role === "assistant" ? "var(--avtoai-assistant-colors-message-assistant-bg)" : 
                "var(--avtoai-assistant-colors-color-theme)",
            }
        })

        const messageP = styled.p({
            id: "avtoai-assistant-message",
            style: { color: role === "assistant" ? "black" : 
                "var(--avtoai-assistant-colors-color-theme-text-color)" },
            text: messageText
        })

        if(innerContent) {
            messageP.appendChild(innerContent)
        }

        messageContainer.appendChild(messageP)
        return [messageContainer, messageP]
    }
}

export class MessageElement extends Element {
    constructor(container, messageText, role) {
        const [message, textElement] = new Message(messageText, role)
        super(container, message)

        this.container = message
        this.textElement = textElement
    }
}

export class LoadingMessageElement extends Element {
    constructor(container){
        const loadingComponent = styled.div({
            id: "avtoai-assistant-chat-app-message-loading",
            style: { animation: "avtoai-assistant-spin 2s linear infinite", height: "30px" }
        })

        loadingComponent.innerHTML = createLoadingSpinnerSVG(
            "var(--avtoai-assistant-colors-color-theme)",
            "30px", "30px"
        )

        const [ message ] = new Message("", "assistant", loadingComponent)
        super(container, message)
    }
}

export class MessageProductCard extends Element {
    constructor(container, { title, variantId, imageUrl }) {
        const cardContainer = styled.div({
            id: "avtoai-assistant-chat-app-message-product-card",
        })
        const cardTitle = styled.h3({
            id: "avtoai-assistant-chat-app-message-product-card-title",
            text: title
        })

        const cardImage = document.createElement("img")
        cardImage.loading = "lazy"
        cardImage.src = imageUrl
        cardImage.alt = "product-image"

        const aspectRation = cardImage.naturalWidth / cardImage.naturalWidth
        const imageHeight = aspectRation > 1 && aspectRation <= 1.5 ? 240 : aspectRation > 1.5 ? 180 : 300
        styled.designComponent(cardImage, {
            style: {
                width: `${aspectRation * imageHeight}px`,
                height: `${imageHeight}px`,
                marginBottom: "2.25rem"
            }
        })

        cardContainer.appendChild(cardTitle)
        cardContainer.appendChild(cardImage)

        const cardButton = new Elements.ThemeButton(cardContainer, "Add to Card")
        cardButton.onclick = async () => {
            await addItemToCart(variantId, 1)
            window.open(window.Shopify.routes.root + "cart")
        }

        super(container, cardContainer)
    }
}

export function removeMessages(container, messages=null, staticAddedMessages=0){
    if(messages && container.childElementCount === messages.length - 2 + staticAddedMessages){
        for(let i = 0; i < staticAddedMessages; i++)
            container.removeChild(container.lastChild)
        return false
    }

    while (container.firstChild) {
        container.removeChild(parent.firstChild)
    }

    return true
}
function extractProduct(message) {
    const productHandleRegex = /product_handle:\s*([^\s]+)/i
    const variantIdRegex = /variant_id:\s*(gid:\/\/shopify\/ProductVariant\/\d+)/i

    const messageText = message.textContent

    const productHandleMatch = messageText.match(productHandleRegex)
    const variantIdMatch = messageText.match(variantIdRegex)

    if(productHandleMatch && variantIdMatch) {
        const [ productHandleText, productHandle ] = productHandleMatch
        const [ variantIdText, variantId ] = variantIdMatch

        message.textContent =  
            messageText.split(productHandleText).join("").split(variantIdText).map(s => s.trim()).join("")

        return {
            productHandle: productHandle, 
            variantId: variantId.split("/").pop()
        }
    }
}

export async function mapMessages({container, messages, staticAddedMessages}){
    const initConversation = removeMessages(container, messages, staticAddedMessages)
    const [ userMessageCopy ] = new Message("", "user")
    const [ assistantMessageCopy ] = new Message("", "assistant")

    const copyMessages = initConversation ? messages : messages.slice(messages.length - 2, messages.length)

    for(let i = 0; i < copyMessages.length; i++) {
        const message = copyMessages[i]

        const clone = message.role === "assistant" ? 
            assistantMessageCopy.cloneNode(true) : userMessageCopy.cloneNode(true)
        clone.children[0].textContent = message.messageText

        container.appendChild(clone)
        
        if(message.role === "assistant"){
            const product = extractProduct(clone.children[0])
            if(product){
                const productDetails = await fetchProductAndVariantDetails(product)
                new MessageProductCard(clone, {...productDetails, variantId: product.variantId })
            }
        }
    }
}
