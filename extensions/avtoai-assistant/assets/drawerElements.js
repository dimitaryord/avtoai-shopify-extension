import { Element } from "./elements.js"

class SideDrawer extends Element {
    constructor(container, side, widgetSection){
        const sideDrawerContainer = document.createElement("div")
        sideDrawerContainer.id = "avtoai-assistant-side-drawer-container"

        const sideDrawerBlur = document.createElement("div")
        sideDrawerBlur.classList.add("avtoai-assistant-side-drawer-blur")
        sideDrawerBlur.id = "avtoai-assistant-side-drawer-blur"
        if(side == "right") sideDrawerBlur.style.right = "0px"
        else if(side == "left") sideDrawerBlur.style.left = "0px"
        sideDrawerBlur.style.display = "block"

        const sideDrawer = document.createElement("div")
        sideDrawer.classList.add("avtoai-assistant-side-drawer")
        sideDrawer.id = "avtoai-assistant-side-drawer"
        sideDrawer.style.display = "block"

        if(side == "right"){
            sideDrawer.style.right = "10px"
            sideDrawer.style.transform = "translate(110%, -50%)"
        } 
        else if(side == "left"){
            sideDrawer.style.left = "10px"
            sideDrawer.style.transform = "translate(-110%, -50%)"
        }

        sideDrawerContainer.appendChild(sideDrawerBlur)
        sideDrawerContainer.appendChild(sideDrawer)
        super(container, sideDrawerContainer)

        this.side = side
        this.widgetSection = widgetSection
        this.isOpen = false

        this.sideDrawerBlur = sideDrawerBlur
        this.content = sideDrawer

        document.addEventListener("click", (event) => {
            if(event.target == sideDrawerBlur){
                this.close()
            }
        })
    }

    close(){
        this.isOpen = false
        this.playAnimation("reverse")
        if(this.widgetSection)
            this.widgetSection.playAnimation("reverse")
    }

    open(){
        this.isOpen = true
        this.playAnimation()
        if(this.widgetSection)
            this.widgetSection.playAnimation()
    }

    playAnimation(direction="normal") {
        this.playElementAnimation(this.sideDrawerBlur, "avtoai-assistant-slide-blur 0.2s forwards", direction)
        this.playElementAnimation
            (this.content, `avtoai-assistant-slide-drawer-${this.side} 0.4s ease-out forwards`, direction)
    }
}

class TopDownDrawer extends Element {
    constructor(container, productId, side, text, imageUrl, buttonText){

    }
}

export default {
    SideDrawer
}