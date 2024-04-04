import { Element } from "../elements.js"
import "../../styles/drawer.css"

import styled from "../lib2.js"

export class Drawer extends Element {
    constructor({ container, position }){
        const sideDrawerContainer = styled.div({ id: "avtoai-assistant-side-drawer-container" })
        const sideDrawerBlur = styled.div({
            id: "avtoai-assistant-side-drawer-blur",
            classes: ["avtoai-assistant-side-drawer-blur"],
            style: {
                display: "block",
                right: position === "right" ? "0px" : null,
                left: position === "left" ? "0px" : null
            }
        }).to(sideDrawerContainer)

        const sideDrawer = styled.div({
            id: "avtoai-assistant-side-drawer",
            classes: ["avtoai-assistant-side-drawer"],
            style: {
                right: position === "right" ? "10px" : null,
                left: position === "left" ? "10px" : null,
                transform: position === "left" ? "translate(-110%, -50%)" : 
                    position === "right" ? "translate(110%, -50%)": null
            }
        }).to(sideDrawerContainer)

        super(container, sideDrawerContainer)

        this.side = position
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
    }

    open(){
        this.isOpen = true
        this.playAnimation()
    }

    playAnimation(direction="normal") {
        this.playElementAnimation(this.sideDrawerBlur, "avtoai-assistant-slide-blur 0.2s forwards", direction)
        this.playElementAnimation
            (this.content, `avtoai-assistant-slide-drawer-${this.side} 0.4s ease-out forwards`, direction)
    }
}