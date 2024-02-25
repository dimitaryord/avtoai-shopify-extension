import Elements, { Element } from "../elements.js"
import styled from "../lib2.js"
import createLoadingSpinnerSVG from "../../svg/loadingIconSVG.js"

import { fetchProductAndVariantDetails, addItemToCart } from "../../api/ajax.js"

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
    constructor(container, { title, price, variantId, imageUrl }) {
        const cardContainer = styled.div({
            id: "avtoai-assistant-chat-app-message-product-card",
        })
        const cardTitle = styled.h3({
            id: "avtoai-assistant-chat-app-message-product-card-title",
            style:{
                marginBlockEnd: "1rem",
            },
            text: title
        })

        const cardImage = document.createElement("img")
        cardImage.loading = "lazy"
        cardImage.src = imageUrl
        cardImage.alt = "product-image"

        styled.designComponent(cardImage, {
            id: "avtoai-assistant-chat-app-message-product-card-image",
            style: {
                width: "300px",
                marginTop: "2.25rem" 
            }
        })

        const cardPrice = styled.p({
            id: "avtoai-assistant-chat-app-message-card-price",
            style: {
                marginBlockStart: "0px",
                marginBottom: "2.25rem",
            },
            text: new Intl.NumberFormat('bg-BG', { style: 'currency', currency: 'BGN' }).format(price)
        })

        cardContainer.appendChild(cardImage)
        cardContainer.appendChild(cardTitle)
        cardContainer.appendChild(cardPrice)

        super(container, cardContainer)

        const cardButton = this.createAddToCartButton()
        cardButton.onclick = async () => {
            await addItemToCart(variantId, 1)
            window.open(window.Shopify.routes.root + "cart")
        }
        cardContainer.appendChild(cardButton)
    }

    createAddToCartButton() {
        const button = styled.button({
            id: "avtoai-assistant-chat-app-messages-add-to-cart-button",
            style: {
                display: "block",
                cursor: "pointer",
                width: "300px",
                marginBottom: "1.25rem",
                paddingInline: "1.25rem",
                paddingBlock: "1rem",
                textAlign: "center",
                border: "1px solid black",
                color: "var(--avtoai-assistant-colors-message-assistant-bg)",
                backgroundColor: "black",
                transform: "scale(1)",
                transition: "transform 0.5s"
            },
            hover: {
                transform: "scale(1.05)"
            },
            text: "Add to Cart"
        })

        return button
    }
}

export function removeMessages(container, messages=null, staticAddedMessages=0){
    if(container.childElementCount === 0) {
        return { initConversation: true }
    }

    for(let i = 0; i < staticAddedMessages; i++)
        container.removeChild(container.lastChild)

    return { initConversation: false, newMessages: messages.length - container.childElementCount }
}

function removeAnnotations(message, annotations) {
    for(let annotation of annotations){
        message.textContent = message.textContent.replace(annotation.text, "")
    }
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
    const { initConversation, newMessages } = removeMessages(container, messages, staticAddedMessages)
    const [ userMessageCopy ] = new Message("", "user")
    const [ assistantMessageCopy ] = new Message("", "assistant")

    const copyMessages = initConversation ? messages : messages.slice(messages.length - newMessages, messages.length)

    for(let i = 0; i < copyMessages.length; i++) {
        const message = copyMessages[i]

        const clone = message.role === "assistant" ? 
            assistantMessageCopy.cloneNode(true) : userMessageCopy.cloneNode(true)
        clone.children[0].textContent = message.messageText

        container.appendChild(clone)

        removeAnnotations(clone.children[0], message.annotations)
        
        if(message.role === "assistant"){
            const product = extractProduct(clone.children[0])
            if(product){
                const productDetails = await fetchProductAndVariantDetails(product)
                new MessageProductCard(clone, {...productDetails, variantId: product.variantId })
            }
        }
    }
}
