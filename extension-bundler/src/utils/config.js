function isLightColor(hex) {
    if(!hex) return
    hex = hex.substring(1)

    let rgb = parseInt(hex, 16)
    let r = (rgb >> 16) & 0xff
    let g = (rgb >> 8) & 0xff
    let b = (rgb >> 0) & 0xff

    let luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b)

    let threshold = 150

    return luminance > threshold
}

export function configureGlobalCSSThemeVariables(colorTheme=null, appTheme){
    const appThemeColor = appTheme === "light" ? "#fefefe" : "#222831"
    const buttonShadowColor = appTheme === "light" ? "#000000aa" : "#ffffffab"
    const borderShadowColor = appTheme === "light" ? "#d1d1d1" : "#393e46"
    const messageColor = appTheme === "light" ? "#f6f6f7" : "#353d3e"
    const textColor = appTheme === "light" ? "black" : "white" 
    const colorThemeTextColor = isLightColor(colorTheme) ? "black" : "white"
    const textShadowColor = appTheme === "light" ? "white" : "black"

    if(colorTheme) 
        document.documentElement.style.setProperty("--avtoai-assistant-colors-color-theme", colorTheme)


    document.documentElement.style
    .setProperty("--avtoai-assistant-colors-app-theme", appThemeColor)
    document.documentElement.style
    .setProperty("--avtoai-assistant-colors-widget-button-shadow", buttonShadowColor)
    document.documentElement.style
    .setProperty("--avtoai-assistant-colors-color-border-shadow", borderShadowColor)
    document.documentElement.style
    .setProperty("--avtoai-assistant-colors-message-assistant-bg", messageColor)
    document.documentElement.style
    .setProperty("--avtoai-assistant-colors-text-color", textColor)
    
    if(colorTheme) 
        document.documentElement.style.setProperty("--avtoai-assistant-colors-color-theme-text-color", colorThemeTextColor)

    document.documentElement.style
    .setProperty("--avtoai-assistant-colors-text-shadow", textShadowColor)
}

export function setMessageSize(size) {
    if(Number(size) >= 10 && Number(size) <= 24)
        document.documentElement.style.setProperty("--avtoai-assistant-chat-app-message-font-size", size + "px")
}