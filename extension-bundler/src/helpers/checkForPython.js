export function checkForPython(codeOutput) {
    return codeOutput
    .replaceAll("(", "[")
    .replaceAll(")", "]")
    .replaceAll("None", "null")
    .replaceAll("True", "true")
    .replaceAll("False", "false")
}