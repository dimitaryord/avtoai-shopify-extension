function isLightColor(hex) {
    hex = hex.substring(1)

    let rgb = parseInt(hex, 16)
    let r = (rgb >> 16) & 0xff
    let g = (rgb >> 8) & 0xff
    let b = (rgb >> 0) & 0xff

    let luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255

    let threshold = 0.5

    return luminance > threshold
}

export function configureGlobalCSSThemeVariables(colorTheme, appTheme, widgetButtonTheme){
    const appThemeColor = appTheme == "light" ? "white" : "#222831"
    const boxShadowColor = appTheme == "light" ? "#000000aa" : "#ffffffab"
    const boxBorderColor = appTheme == "light" ? "#000000aa" : "#ffffffab"
    const textColor = appTheme == "light" ? "black" : "white" 
    const colorThemeTextColor = isLightColor(colorTheme) ? "black" : "white"
    const textShadowColor = appTheme == "light" ? "white" : "black"

    document.documentElement.style
    .setProperty("--avtoai-assistant-colors-color-theme", colorTheme)
    document.documentElement.style
    .setProperty("--avtoai-assistant-colors-app-theme", appThemeColor)
    document.documentElement.style
    .setProperty("--avtoai-assistant-colors-widget-button-theme", widgetButtonTheme)
    document.documentElement.style
    .setProperty("--avtoai-assistant-colors-widget-box-border", boxBorderColor)
    document.documentElement.style
    .setProperty("--avtoai-assistant-colors-widget-box-shadow", boxShadowColor)
    document.documentElement.style
    .setProperty("--avtoai-assistant-colors-text-color", textColor)
    document.documentElement.style
    .setProperty("--avtoai-assistant-colors-color-theme-text-color", colorThemeTextColor)
    document.documentElement.style
    .setProperty("--avtoai-assistant-colors-text-shadow", textShadowColor)
}