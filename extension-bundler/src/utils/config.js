function isLightColor(hex) {
    hex = hex.substring(1)

    let rgb = parseInt(hex, 16)
    let r = (rgb >> 16) & 0xff
    let g = (rgb >> 8) & 0xff
    let b = (rgb >> 0) & 0xff

    let luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b)

    let threshold = 150

    return luminance > threshold
}

export function configureGlobalCSSThemeVariables(colorTheme, appTheme){
    const appThemeColor = appTheme == "light" ? "#fefefe" : "#222831"
    const buttonShadowColor = appTheme == "light" ? "#000000aa" : "#ffffffab"
    const textColor = appTheme == "light" ? "black" : "white" 
    const colorThemeTextColor = isLightColor(colorTheme) ? "black" : "white"
    const textShadowColor = appTheme == "light" ? "white" : "black"

    document.documentElement.style
    .setProperty("--avtoai-assistant-colors-color-theme", colorTheme)
    document.documentElement.style
    .setProperty("--avtoai-assistant-colors-app-theme", appThemeColor)
    document.documentElement.style
    .setProperty("--avtoai-assistant-colors-widget-button-shadow", buttonShadowColor)
    document.documentElement.style
    .setProperty("--avtoai-assistant-colors-text-color", textColor)
    document.documentElement.style
    .setProperty("--avtoai-assistant-colors-color-theme-text-color", colorThemeTextColor)
    document.documentElement.style
    .setProperty("--avtoai-assistant-colors-text-shadow", textShadowColor)
}