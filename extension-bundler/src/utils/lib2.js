const styled = {
    designComponent: (component, { classes, style, id, text, animate, mediaQueries }) => {

        if(classes) component.classList.add(...classes)
        if(style) Object.assign(component.style, style)
        if(id) component.id = id
        if(text) component.textContent = text

        if(animate && id){
            const style = document.createElement('style')
            document.head.appendChild(style)
            const styleSheet = style.sheet

            const animations = Object.entries(animate)
            for(let [k, v] of animations) {
                const cssRule = `
                    #${id}:${k} {
                        ${Object.entries(v).map(([sK, sV]) => `${sK}: ${sV};\n`)}
                    }
                `
                styleSheet.insertRule(cssRule, 0)
            }
        }

        return component
    },

    div: ({ classes, style, id, text, hover, animate}) => {
        const div = document.createElement('div')
        return styled.designComponent(div, { classes, style, id, text, hover, animate})
    },

    a: ({ classes, style, id, text, hover, animate}) => {
        const a = document.createElement('a')
        return styled.designComponent(a, { classes, style, id, text, hover, animate})
    },

    h1: ({ classes, style, id, text, hover, animate}) => {
        const h1 = document.createElement('h1')
        return styled.designComponent(h1, { classes, style, id, text, hover, animate})
    },

    h2: ({ classes, style, id, text, hover, animate}) => {
        const h2 = document.createElement('h2')
        return styled.designComponent(h2, { classes, style, id, text, hover, animate})
    },

    h3: ({ classes, style, id, text, hover, animate}) => {
        const h3 = document.createElement('h3')
        return styled.designComponent(h3, { classes, style, id, text, hover, animate})
    },

    h4: ({ classes, style, id, text, hover, animate}) => {
        const h4 = document.createElement('h4')
        return styled.designComponent(h4, { classes, style, id, text, hover, animate})
    },

    h5: ({ classes, style, id, text, hover, animate}) => {
        const h5 = document.createElement('h5')
        return styled.designComponent(h5, { classes, style, id, text, hover, animate})
    },

    h6: ({ classes, style, id, text, hover, animate}) => {
        const h6 = document.createElement('h6')
        return styled.designComponent(h6, { classes, style, id, text, hover, animate})
    },

    p: ({ classes, style, id, text, hover, animate}) => {
        const p = document.createElement('p')
        return styled.designComponent(p, { classes, style, id, text, hover, animate})
    },

    button: ({ classes, style, id, text, hover, animate}) => {
        const button = document.createElement('button')
        return styled.designComponent(button, { classes, style, id, text, hover, animate})
    },

    input: ({ classes, style, id, text, hover, animate}) => {
        const input = document.createElement('input')
        return styled.designComponent(input, { classes, style, id, text, hover, animate})
    },
    
}

Object.freeze(styled)

export default styled