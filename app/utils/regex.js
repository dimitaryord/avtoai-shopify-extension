export function createVariables({content, variables}) {
    const matchRegex = /\$\{\{\s*(\w+)\s*\}\}/g;
    const replacedString = content.replace(matchRegex, (match, placeholder) => {
        const variable = variables[placeholder];
        return variable ? variable : match;
    });
    return replacedString;
}