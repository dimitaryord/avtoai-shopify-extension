const styled = {
    designComponent: (component, { classes, style, id, text, hover }) => {

        if(classes) component.classList.add(...classes)
        if(style) Object.assign(component.style, style)
        if(id) component.id = id
        if(text) component.textContent = text

        if(hover){
            component.onmouseover = () => Object.assign(component.style, hover)
            component.onmouseout = () => Object.assign(component.style, style)
        }

        return component
    },

    div: ({ classes, style, id, text, hover }) => {
        const div = document.createElement('div')
        return styled.designComponent(div, { classes, style, id, text, hover })
    },

    a: ({ classes, style, id, text, hover }) => {
        const a = document.createElement('a')
        return styled.designComponent(a, { classes, style, id, text, hover })
    },

    h1: ({ classes, style, id, text, hover }) => {
        const h1 = document.createElement('h1')
        return styled.designComponent(h1, { classes, style, id, text, hover })
    },

    h2: ({ classes, style, id, text, hover }) => {
        const h2 = document.createElement('h2')
        return styled.designComponent(h2, { classes, style, id, text, hover })
    },

    h3: ({ classes, style, id, text, hover }) => {
        const h3 = document.createElement('h3')
        return styled.designComponent(h3, { classes, style, id, text, hover })
    },

    h4: ({ classes, style, id, text, hover }) => {
        const h4 = document.createElement('h4')
        return styled.designComponent(h4, { classes, style, id, text, hover })
    },

    h5: ({ classes, style, id, text, hover }) => {
        const h5 = document.createElement('h5')
        return styled.designComponent(h5, { classes, style, id, text, hover })
    },

    h6: ({ classes, style, id, text, hover }) => {
        const h6 = document.createElement('h6')
        return styled.designComponent(h6, { classes, style, id, text, hover })
    },

    p: ({ classes, style, id, text, hover }) => {
        const p = document.createElement('p')
        return styled.designComponent(p, { classes, style, id, text, hover })
    },

    button: ({ classes, style, id, text, hover }) => {
        const button = document.createElement('button')
        return styled.designComponent(button, { classes, style, id, text, hover })
    },

    input: ({ classes, style, id, text, hover }) => {
        const input = document.createElement('input')
        return styled.designComponent(input, { classes, style, id, text, hover })
    },
    
}

Object.freeze(styled)

export default styled