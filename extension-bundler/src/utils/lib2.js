const styled = {
    designComponent: (component, setup) => {
        const { classes, style, id, text } =  setup

        if(classes) component.classList.add(...classes)
        if(style) Object.assign(component.style, style)
        if(id) component.id = id
        if(text) component.textContent = text

        return component
    },

    div: ({ classes, style, id, text }) => {
        const div = document.createElement('div')
        return styled.designComponent(div, { classes, style, id, text })
    },

    a: ({ classes, style, id, text }) => {
        const div = document.createElement('a')
        return styled.designComponent(div, { classes, style, id, text })
    },

    h1: ({ classes, style, id, text }) => {
        const div = document.createElement('h1')
        return styled.designComponent(div, { classes, style, id, text })
    },

    h2: ({ classes, style, id, text }) => {
        const div = document.createElement('h2')
        return styled.designComponent(div, { classes, style, id, text })
    },

    h3: ({ classes, style, id, text }) => {
        const div = document.createElement('h3')
        return styled.designComponent(div, { classes, style, id, text })
    },

    h4: ({ classes, style, id, text }) => {
        const div = document.createElement('h4')
        return styled.designComponent(div, { classes, style, id, text })
    },

    h5: ({ classes, style, id, text }) => {
        const div = document.createElement('h5')
        return styled.designComponent(div, { classes, style, id, text })
    },

    h6: ({ classes, style, id, text }) => {
        const div = document.createElement('h6')
        return styled.designComponent(div, { classes, style, id, text })
    },

    p: ({ classes, style, id, text }) => {
        const div = document.createElement('p')
        return styled.designComponent(div, { classes, style, id, text })
    },

    button: ({ classes, style, id, text }) => {
        const div = document.createElement('button')
        return styled.designComponent(div, { classes, style, id, text })
    },

    input: ({ classes, style, id, text }) => {
        const div = document.createElement('input')
        return styled.designComponent(div, { classes, style, id, text })
    },
    
}

Object.freeze(styled)

export default styled