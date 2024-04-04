const styled = {
    designComponent: (component, { classes, style, id, text }) => {

        if(classes) component.classList.add(...classes)
        if(style) Object.assign(component.style, style)
        if(id) component.id = id
        if(text) component.textContent = text

        component.clone = (times) => {
            const cloned = []

            for(let _ = 0; _ < times; _++)
                cloned.push(component.cloneNode(true))

            cloned.to = (container) => {
                if(container) 
                    cloned.forEach(clone => container.appendChild(clone))
                return cloned
            }

            return cloned
        }

        component.to = (container) => {
            if(container) container.appendChild(component)
            return component
        }

        return component
    },

    div: ({ classes, style, id, text}) => {
        const div = document.createElement('div')
        return styled.designComponent(div, { classes, style, id, text })
    },

    span: ({ classes, style, id, text }) => {
        const span = document.createElement('span')
        return styled.designComponent(span, { classes, style, id, text })
    },

    a: ({ classes, style, id, text }) => {
        const a = document.createElement('a')
        return styled.designComponent(a, { classes, style, id, text })
    },

    h1: ({ classes, style, id, text }) => {
        const h1 = document.createElement('h1')
        return styled.designComponent(h1, { classes, style, id, text })
    },

    h2: ({ classes, style, id, text }) => {
        const h2 = document.createElement('h2')
        return styled.designComponent(h2, { classes, style, id, text })
    },

    h3: ({ classes, style, id, text }) => {
        const h3 = document.createElement('h3')
        return styled.designComponent(h3, { classes, style, id, text })
    },

    h4: ({ classes, style, id, text }) => {
        const h4 = document.createElement('h4')
        return styled.designComponent(h4, { classes, style, id, text })
    },

    h5: ({ classes, style, id, text }) => {
        const h5 = document.createElement('h5')
        return styled.designComponent(h5, { classes, style, id, text })
    },

    h6: ({ classes, style, id, text }) => {
        const h6 = document.createElement('h6')
        return styled.designComponent(h6, { classes, style, id, text })
    },

    p: ({ classes, style, id, text }) => {
        const p = document.createElement('p')
        return styled.designComponent(p, { classes, style, id, text })
    },

    label: ({ classes, style, id, text }) => {
        const label = document.createElement('label')
        return styled.designComponent(label, { classes, style, id, text })
    },

    button: ({ classes, style, id, text }) => {
        const button = document.createElement('button')
        return styled.designComponent(button, { classes, style, id, text })
    },

    input: ({ classes, style, id, text }) => {
        const input = document.createElement('input')
        return styled.designComponent(input, { classes, style, id, text })
    },

    textarea: ({ classes, style, id, text }) => {
        const textarea = document.createElement('textarea')
        return styled.designComponent(textarea, { classes, style, id, text })
    },

    select: ({ classes, style, id, text }) => {
        const select = document.createElement('select')
        return styled.designComponent(select, { classes, style, id, text })
    },

    option: ({ classes, style, id, text }) => {
        const option = document.createElement('option')
        return styled.designComponent(option, { classes, style, id, text })
    }
    
}

Object.freeze(styled)

export default styled