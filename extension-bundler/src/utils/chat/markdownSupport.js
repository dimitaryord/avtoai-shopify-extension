export function convertMarkdownToHTML(message) {
    let markdownText = message.innerHTML;

    // Simple Markdown parsing rules
    let htmlText = markdownText
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*)\*/gim, '<em>$1</em>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a style="text-decoration:none;color:black" href="$2">$1</a>');

    htmlText = htmlText.replace(/\n/g, '<br>');

    message.innerHTML = htmlText;
}