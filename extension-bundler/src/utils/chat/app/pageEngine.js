export class PageEngine {
    constructor(appContainer, { defaultPage=""}) {
        this.appContainer = appContainer
        this.defaultPage = defaultPage
        this.currentPage = defaultPage
        this.lastPage = null
        this.pages = {}
    }

    createPage(pageName, ...components){
        this.pages[pageName] = components
        if(pageName === this.defaultPage)
            for(let pageElement of components)
                this.appContainer.appendChild(pageElement)
    }

    changePage(pageName){
        if(this.pages.hasOwnProperty(pageName) && this.currentPage !== pageName){
            for(let currentPage of this.pages[this.currentPage])
                this.appContainer.removeChild(currentPage)
            for(let newPage of this.pages[pageName])
                this.appContainer.appendChild(newPage)

            this.lastPage = this.currentPage
            this.currentPage = pageName
        }
    }

    back(){
        if(this.lastPage){
            for(let currentPage of this.pages[this.currentPage])
                this.appContainer.removeChild(currentPage)
            for(let lastPage of this.pages[this.lastPage])
                this.appContainer.appendChild(lastPage)

                this.currentPage = this.lastPage
                this.lastPage = null
        }
    }
}