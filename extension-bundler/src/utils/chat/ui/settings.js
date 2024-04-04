import { configureGlobalCSSThemeVariables, setMessageSize } from "../../config.js"

import styled from "../../lib2"
import createBackIconSVG from "../../../svg/backIconSVG.js"
import "../../../styles/settings.css"


export default class Settings{
    constructor(backCallbackFunction, { defaultTheme }){
        const settingsContainer = styled.div({
            id: "avtoai-assistant-app-settings-container",
            style: {
                flexGrow: "1",
                padding: "5rem"
            }
        })

        const settingsTitleContainer = styled.div({
            id: "avtoai-assistant-app-settings-title-container",
            style: {
                display: "flex",
                width: "100%",
                alignItems: "center",
                marginBottom: "5rem"
            }
        }).to(settingsContainer)

        const backButton = styled.button({
            id: "avtoai-assistant-app-settings-title-back-button",
            classes: ["avtoai-assistant-button-opacity-hover"],
            style: { marginRight: "1rem", background: "transparent", padding: "0",
             border: "none", outline: "none", cursor: "pointer" }
        }).to(settingsTitleContainer)
        backButton.innerHTML = createBackIconSVG("var(--avtoai-assistant-colors-text-color)")
        backButton.onclick = backCallbackFunction

        styled.h2({
            id: "avtoai-assistant-app-settings-title",
            style: {
                color: "var(--avtoai-assistant-colors-text-color)",
            },
            text: "Settings"
        }).to(settingsTitleContainer)

        const themeSetting = styled.div({
            id: "avtoai-assistant-app-settings-theme-container",
            style: {
                display: "flex",
                alignItems: "center",
            }
        }).to(settingsContainer)

        this.currentTheme = defaultTheme
        styled.p({
            id: "avtoai-assistant-app-settings-text",
            style: {
                color: "var(--avtoai-assistant-colors-text-color)",
                flexGrow: "1",
                width: "100%"
            },
            text: `Theme (Default: ${defaultTheme === "light" ? "Light" : "Dark" })`
        }).to(themeSetting)

        const themeSwitchContainer = styled.div({
            id : "avtoai-assistant-app-settings-label-container",
            style: {
                display: "flex",
                justifyContent: "end",
                alignItems: "center"
            }
        }).to(themeSetting)

        const themeSwitch = styled.label({
            id: "avtoai-assistant-app-settings-label", 
            classes: ["avtoai-assistant-app-settings-switch"],

        }).to(themeSwitchContainer)

        const checkbox = styled.input({
            id: "avtoai-assistant-app-settings-checkbox",
            classes: ["avtoai-assistant-app-settings-input"]
        }).to(themeSwitch)
        checkbox.type = "checkbox"
        checkbox.onclick = () => {
            this.currentTheme = this.currentTheme === "light" ? "dark": "light"
            configureGlobalCSSThemeVariables(null, this.currentTheme)
        }

        styled.span({
            id: "avtoai-assistant-app-settings-slider",
            classes: ["avtoai-assistant-app-settings-slider"]
        }).to(themeSwitch)

        const fontSizeContainer = styled.div({
            id: "avtoai-assistant-app-settings-font-size-container",
            style: {
                display: "flex",
                alignItems: "center",
            }
        }).to(settingsContainer)

        styled.p({
            id: "avtoai-assistant-app-settings-text",
            style: {
                color: "var(--avtoai-assistant-colors-text-color)",
                flexGrow: "1",
                width: "100%"
            },
            text: "Chat Font Size"
        }).to(fontSizeContainer)

        const fontSelect = styled.select({
            id: "avtoai-assistant-app-settings-select",
            style: {
                background: "transparent",
                borderRadius: "10px",
                padding: "1rem",
                outlineColor: "var(--avtoai-assistant-colors-color-theme)",
                color: "var(--avtoai-assistant-colors-text-color)"
            }

        }).to(fontSizeContainer)
        fontSelect.addEventListener("change", (event) => {
            event.preventDefault()
            setMessageSize(event.target.value)
        })

        const sizes = [ 10, 12, 14 ,16, 18, 20, 24 ]
        for(let size of sizes) {
            const currentOption = styled.option({
                id: "avtoai-assistant-app-settings-option",
                style: { backgroundColor: "var(--avtoai-assistant-colors-app-theme)", fontSize: "1.75rem" },
                text: size
            }).to(fontSelect)
            currentOption.value = size
            if(size === 16) currentOption.selected = "selected"
        }

        this.content = settingsContainer
    }
}