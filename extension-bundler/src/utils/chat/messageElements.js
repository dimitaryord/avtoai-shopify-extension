import { convertMarkdownToHTML } from "./markdownSupport.js"
import { addItemToCart } from "../../api/ajax.js"
import createLoadingSpinnerSVG from "../../svg/loadingIconSVG.js"

import styled from "../lib2.js"

export class Message {
    constructor(messageText, role, innerContent, { paddingBlock=false, paddingInline=true, border=false }) {
        const messageContainer = styled.div({
            id: "avtoai-assistant-message-container",
            style: {
                maxWidth: "80%",
                borderRadius: "10px",
                border: border ? "1px solid var(--avtoai-assistant-colors-text-color)" : "none",
                paddingInline: paddingInline ? "1.25em" : "0px",
                paddingBlock: paddingBlock ? "1em" : "0px",
                marginBottom: "1.5em",
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
        messageContainer.appendChild(messageP)

        if(innerContent) {
            this.innerContent = innerContent
            messageContainer.appendChild(innerContent)
        }

        this.content = messageContainer
        this.textElement = messageP
        this.text = messageP.textContent
    }

    isEmpty(){
        return this.text.trim() === "" && this.content.contains(this.innerContent)
    }

    updateMessage(message) {
        if(this.content.contains(this.innerContent)){
            this.content.removeChild(this.innerContent)
            styled.designComponent(this.content, {
                style: {
                    paddingInline: "1.25em",
                    paddingBlock: "0px",
                }
            })
        }

        if(typeof message === 'string'){
            this.textElement.textContent = message
            this.text = message
        }
        else if(typeof message === 'function'){
            this.textElement.textContent = message(this.text)
            this.text = message(this.text)
        }

        convertMarkdownToHTML(this.textElement)
    }

    updateInnerContent(innerContent) {
        if(this.content.contains(this.innerContent))
            this.content.removeChild(this.innerContent)
        this.content.appendChild(innerContent)
        this.innerContent = innerContent
    }
}

export class MessageElement extends Message {
    constructor(container, messageText, role) {
        super(messageText, role, null, {})
        container.appendChild(this.content)
    }
}

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

export class ProductInfoMessage extends Message {
    constructor(container, { defaultVariantId, variants, options }) {
        const defaultOption = defaultVariantId ? variants.find(variant => variant.id === defaultVariantId) : variants[0]

        const messageContainer = styled.div({
            id: "avtoai-assistant-chat-app-product-info-message",
        })
        super("", "assistant", messageContainer, { paddingInline: false, border: true })


        const messageTitle = styled.h3({
            id: "avtoai-assistant-chat-app-product-info-message-title",
            style:{
                marginBlockEnd: "0.25em",
                marginInline: "1.25em",
                fontWeight: "600"
            },
            text: defaultOption.displayName
        })

        const messagePrice = styled.p({
            id: "avtoai-assistant-chat-app-message-card-price",
            style: {
                marginBlockStart: "0px",
                marginBottom: "2.25rem",
                marginInline: "1.25em"
            },
            text: this.formatPrice(defaultOption.price)
        })

        const messageImage = document.createElement("img")
        messageImage.loading = "lazy"
        messageImage.src = defaultOption.imageUrl
        messageImage.alt = "product-image"

        styled.designComponent(messageImage, {
            id: "avtoai-assistant-chat-app-product-info-message-image",
            style: {
                width: "100%",
                height: "300px",
                borderRadius: "10px 10px 0px 0px",
                objectFit: "cover"
            }
        })


        messageContainer.appendChild(messageImage)
        messageContainer.appendChild(messageTitle)
        messageContainer.appendChild(messagePrice)


        container.appendChild(this.content)

        this.variants = variants
        this.selectedVariant = defaultOption
        this.selectedOptions = [...defaultOption.options]

        this.image = messageImage
        this.title = messageTitle
        this.price = messagePrice

        const optionsWrap = this.createOptions(options)
        const buttons = this.createButtonSection()

        messageContainer.appendChild(optionsWrap)
        messageContainer.appendChild(buttons)

    }

    formatPrice(price) {
        return new Intl.NumberFormat('en-emodeng', { style: 'currency', currency: 'USD' }).format(price)
    }

    createOptions(options){
        const optionsContainer = styled.div({
            id: "avtoai-assistant-chat-app-product-info-message-options-container",
            style: {
                paddingInline: "1.25em",
                marginBlockEnd: "1.25em"
            }
        })

        options.forEach((option, index) => {
            const optionElement = this.createOption(option, index)
            optionsContainer.appendChild(optionElement)
        })

        return optionsContainer
    }

    createBlockBorderSelection(options, optionElement, index){
        if(index == options.length - 1){
            if(index !== 0){
                if(options[index - 1].style.opacity && options[index - 1].style.opacity !== "1"){
                    styled.designComponent(optionElement, {
                        style: {
                            borderLeft: "2px solid black"
                        }
                    })

                    styled.designComponent(options[index - 1], {
                        style: {
                            borderRight: "none"
                        }
                    })
                }   
            }
        }
        else if(index === 0){
            if(index !== options.length - 1){
                if(options[index + 1].style.opacity && options[index + 1].style.opacity !== "1"){
                    styled.designComponent(optionElement, {
                        style: {
                            borderRight: "2px solid black"
                        }
                    })

                    styled.designComponent(options[index + 1], {
                        style: {
                            borderLeft: "none"
                        }
                    })
                }
            }
        }
        else{
            if(options[index - 1].style.opacity && options[index - 1].style.opacity !== "1"){
                styled.designComponent(optionElement, {
                    style: {
                        borderLeft: "2px solid black"
                    }
                })

                styled.designComponent(options[index - 1], {
                    style: {
                        borderRight: "none"
                    }
                })
            }
            if(options[index + 1].style.opacity && options[index + 1].style.opacity !== "1"){
                styled.designComponent(optionElement, {
                    style: {
                        borderRight: "2px solid black",
                    }
                })

                styled.designComponent(options[index + 1], {
                    style: {
                        borderLeft: "none"
                    }
                })
            }
        }
    }

    selectOption(target, type){
        const options = Array.from(target.parentElement.children)

        options.forEach((optionElement, index) => {
            if(optionElement === target){
                if(type === "color")
                    styled.designComponent(optionElement, {
                        style: {
                            outline: "3px double black"
                        }
                    })
                else {
                    styled.designComponent(optionElement, {
                        style: {
                            opacity: "1"
                        }
                    })
                    this.createBlockBorderSelection(options, optionElement, index)
                    optionElement.onmouseenter = () => this.createBlockBorderSelection(options, optionElement, index)
                }
                    
            }
            else {
                if(type === "color")
                    styled.designComponent(optionElement, {
                        style: {
                            outline: null
                        }
                    })
                else {
                    styled.designComponent(optionElement, {
                        style: {
                            opacity: null
                        }
                    })
                    optionElement.onmouseenter = () => this.createBlockBorderSelection(options, optionElement, index)
                }
            }
        })
    }

    selectVariant(optionChange, index){
        this.selectedOptions[index] = optionChange

        const variant = this.variants.find(v => 
            v.options.length === this.selectedOptions.length && 
            v.options.every((value, i) => value === this.selectedOptions[i])
        )
        
        if(variant){
            this.selectedVariant = variant

            this.image.src = variant.imageUrl
            this.title.textContent = variant.displayName
            this.price.textContent = this.formatPrice(variant.price)
        }
    }

    createOption(option, index){
        const optionContainer = styled.div({
            id: "avtoai-assistant-chat-app-product-info-message-option-container",
        })

        const optionTitle = styled.p({
            id: "avtoai-assistant-chat-app-product-info-message-option-title",
            style: {
                color: "black",
                fontWeight: "600",
                fontSize: "12px",
                marginBlockEnd: "0.25rem"
            },
            text: option.name.toUpperCase()
        })

        const wrapper = styled.div({
            id: "avtoai-assistant-chat-app-product-info-message-option-wrapper",
            style: {
                display: "flex",    
                flexWrap: "wrap"
            }
        })

        option.values.forEach(optionValue => {
            const isColor = option.name.toLowerCase() === "color" || option.name.toLowerCase() === "colour"
            ? "color" : "block"
            
            const optionElement = isColor === "color" ? styled.div({
                id: "avtoai-assistant-chat-app-product-info-message-option-color",
                style: {
                    display: "block",
                    cursor: "pointer",
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    backgroundColor: optionValue.toLowerCase(),
                    marginBlockEnd: "0.25em",
                    marginInlineEnd: "0.25em"
                }
            }) : styled.div({
                    id: "avtoai-assistant-chat-app-product-info-message-option-other",
                    classes: ["avtoai-assistant-button-opacity-hover-4"],
                    style: {
                        minWidth: "50px",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "0.5rem",
                        borderTop: "2px solid black",
                        borderBottom: "2px solid black",
                        borderLeft: "2px solid black",
                        borderRight: 
                            option.values.indexOf(optionValue) === option.values.length - 1 ? "2px solid black" : "none",
                        borderRadius: 
                            option.values.indexOf(optionValue) === option.values.length - 1 ? "0px 10px 10px 0px"
                            : option.values.indexOf(optionValue) === 0 ? "10px 0px 0px 10px" : "none"
                    },
                    text: optionValue
                })
                
            wrapper.appendChild(optionElement)
            
            optionElement.onclick = (event) => {
                this.selectOption(event.target, isColor)
                this.selectVariant(optionValue, index)
            }
            
            if(this.selectedVariant.options.includes(optionValue))
                this.selectOption(optionElement, isColor)

        })

        optionContainer.appendChild(optionTitle)
        optionContainer.appendChild(wrapper)
        return optionContainer
    }

    createButtonSection(){
        const buttonsContainer = styled.div({
            id: "avtoai-assistant-chat-app-product-info-message-buttons-container",
            style: {
                display: "flex",
                paddingInline: "1.25em",
                marginBottom: "1.25em",
            }
        })

        const viewProductButton = styled.button({
            id: "avtoai-assistant-chat-app-product-info-message-buttons-view-product",
            classes: ["avtoai-assistant-button-scale-hover"],
            style: {
                display: "block",
                cursor: "pointer",
                width: "50%",
                paddingInline: "0.25em",
                paddingBlock: "0.25em",
                textAlign: "center",
                border: "1px solid black",
                marginInlineEnd: "0.25rem",
                borderRadius: "50px",
                color: "black",
                backgroundColor: "var(--avtoai-assistant-colors-message-assistant-bg)",
            },
            text: "View Product"
        })

        const addToCartButton = styled.button({
            id: "avtoai-assistant-chat-app-product-info-message-buttons-add-to-cart",
            classes: ["avtoai-assistant-button-scale-hover"],
            style: {
                display: "block",
                cursor: "pointer",
                width: "50%",
                paddingInline: "1.25rem",
                paddingBlock: "1rem",
                textAlign: "center",
                border: "1px solid black",
                borderRadius: "50px",
                color: "var(--avtoai-assistant-colors-message-assistant-bg)",
                backgroundColor: "black ",
            },
            text: "Add to Cart"
        })

        addToCartButton.onclick = async () => {
            await addItemToCart(this.selectedVariant.id, 1)
            window.open(window.Shopify.routes.root + "cart")
        }

        buttonsContainer.appendChild(viewProductButton)
        buttonsContainer.appendChild(addToCartButton)

        return buttonsContainer
    }
}