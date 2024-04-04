import { Message } from "./messageElement"
import styled from "../../lib2.js"

import { addItemToCart } from "../../../api/ajax.js"

export class ProductInfoMessage extends Message {
    constructor(container, { productHandle, defaultVariantId, variants, options }, insertBeforeElement=null) {
        const defaultOption = defaultVariantId ? variants.find(variant => variant.id === defaultVariantId) : variants[0]

        const messageContainer = styled.div({
            id: "avtoai-assistant-chat-app-product-info-message",
        })
        super("", "assistant", messageContainer, { paddingInline: false, border: true })


        const messageTitle = styled.h3({
            id: "avtoai-assistant-chat-app-product-info-message-title",
            style:{
                color: "var(--avtoai-assistant-colors-text-color)",
                marginBlockEnd: "0.25em",
                marginInline: "1.25em",
                fontWeight: "600"
            },
            text: defaultOption.displayName
        })

        const messagePrice = styled.p({
            id: "avtoai-assistant-chat-app-message-card-price",
            style: {
                color: "var(--avtoai-assistant-colors-text-color)",
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


        if(!insertBeforeElement)
            container.appendChild(this.content)
        else 
            container.insertBefore(this.content, insertBeforeElement)
        

        this.variants = variants
        this.selectedVariant = defaultOption
        this.productHandle = productHandle
        this.selectedOptions = [...defaultOption.options]

        this.image = messageImage
        this.title = messageTitle
        this.price = messagePrice

        const optionsWrap = this.createOptions(options)
        const buttons = this.createButtonSection()

        messageContainer.appendChild(optionsWrap)
        messageContainer.appendChild(buttons)

        this.data = {
            index: container.childElementCount, 
            productHandle: productHandle, 
            defaultVariantId: defaultVariantId, 
            variants: variants, 
            options: options,
        }

    }

    formatPrice(price) {
        return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(price)
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
            if(option.name.toLowerCase() !== "title" || option.values.length > 1 || !option.values.includes("Default Title")){
                const optionElement = this.createOption(option, index)
                optionsContainer.appendChild(optionElement)
            }
        })

        return optionsContainer
    }


    selectOption(target, type){
        const options = Array.from(target.parentElement.children)

        options.forEach((optionElement) => {
            if(optionElement === target){
                if(type === "color")
                    styled.designComponent(optionElement, {
                        style: {
                            outline: "3px double var(--avtoai-assistant-colors-text-color)"
                        }
                    })
                else {
                    styled.designComponent(optionElement, {
                        style: {
                            opacity: "1"
                        }
                    })
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
                color: "var(--avtoai-assistant-colors-text-color)",
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
                        color: "var(--avtoai-assistant-colors-text-color)",
                        borderTop: "2px solid var(--avtoai-assistant-colors-text-color)",
                        borderBottom: "2px solid var(--avtoai-assistant-colors-text-color)",
                        borderLeft: option.values.indexOf(optionValue) === 0 ? "2px solid var(--avtoai-assistant-colors-text-color)" : "1px solid var(--avtoai-assistant-colors-text-color)",
                        borderRight: 
                            option.values.indexOf(optionValue) === option.values.length - 1 ? "2px solid var(--avtoai-assistant-colors-text-color)" : "1px solid var(--avtoai-assistant-colors-text-color)",
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
                border: "1px solid var(--avtoai-assistant-colors-text-color)",
                marginInlineEnd: "0.25rem",
                borderRadius: "50px",
                color: "var(--avtoai-assistant-colors-text-color)",
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
                border: "1px solid var(--avtoai-assistant-colors-text-color)",
                borderRadius: "50px",
                color: "var(--avtoai-assistant-colors-message-assistant-bg)",
                backgroundColor: "var(--avtoai-assistant-colors-text-color)",
            },
            text: "Add to Cart"
        })

        viewProductButton.onclick = () => {
            window.open(window.Shopify.routes.root + `products/${this.productHandle}`)
        }

        addToCartButton.onclick = async () => {
            await addItemToCart(this.selectedVariant.id, 1)
            window.open(window.Shopify.routes.root + "cart")
        }

        buttonsContainer.appendChild(viewProductButton)
        buttonsContainer.appendChild(addToCartButton)

        return buttonsContainer
    }
}