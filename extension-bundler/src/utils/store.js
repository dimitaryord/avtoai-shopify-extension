class ProductClickedStore {
    constructor() {
        this.storeName = 'ProductClickedStore'
    }

    addClickedProduct(urlArray) {
        const clickedLinks = localStorage.getItem(this.storeName)
        if(!clickedLinks)
            return localStorage.setItem(this.storeName, JSON.stringify(urlArray))
        const clickedLinksArray = JSON.parse(clickedLinks)
        const newData = Array.from(new Set([...clickedLinksArray, ...urlArray]))
        localStorage.setItem(this.storeName, JSON.stringify(newData))
    }

    isProductClicked(url) {
        const clickedLinks = localStorage.getItem(this.storeName)
        if(!clickedLinks) return false
        const clickedLinksArray = JSON.parse(clickedLinks)
        return clickedLinksArray.includes(url) 
    }
}


class ProductLinkStore {
    constructor() {
        this.storeName = "ProductLinkStore"
        this.productClickedStore = new ProductClickedStore()
    }

    filterProductElements(elements) {
        const urlRegex = /https?:\/\/[\w.-]+\/(products|items|goods|merchandise)\/[\w-]+/
        const regularCheckRegex = /(product|item|goods|merchandise)/i

        function checkForClass(element) {
            for(let className of element.classList) {
                if(regularCheckRegex.test(className.toLowerCase())) 
                    return true
            }
            return false
        }

        function checkForAttribute(element) {
            for(let attribute of element.attributes) {
                if(regularCheckRegex.test(attribute.name.toLowerCase()) || 
                regularCheckRegex.test(attribute.value.toLowerCase()))
                    return true
            }
            return false
        }

        return Array.from(elements).filter((element) => (checkForClass(element) || checkForAttribute(element)
         || urlRegex.test(element.href) || regularCheckRegex.test(element.id)) 
         && !this.productClickedStore.isProductClicked(element.href))
    }

    update(url){
        const storage = localStorage.getItem(this.storeName)
        const filterUrlHashAndQuery = url.split('?')[0].split('#')[0]

        if(!storage){
            localStorage.setItem(this.storeName, JSON.stringify([filterUrlHashAndQuery]))
            return [filterUrlHashAndQuery]
        }

        const storageData = JSON.parse(storage)
        if(!Array.isArray(storageData)) return

        const newData = Array.from(new Set([...storageData, filterUrlHashAndQuery]))
        localStorage.setItem(this.storeName, JSON.stringify(newData))
        return newData

    }

    getBackup() {
        const storageBackup = localStorage.getItem(this.storeName)
        if(!storageBackup) return []
        return JSON.parse(storageBackup)
    }

    deleteItemWithIndex(index) {
        const storage = Array.from(JSON.parse(localStorage.getItem(this.storeName)))
        const deletedItem = storage.splice(index, 1)
        this.productClickedStore.addClickedProduct(deletedItem)
        return storage
    }
}

const productLinkStore = new ProductLinkStore()

class MessageStore { 

}

export default {
    productLinkStore,
}