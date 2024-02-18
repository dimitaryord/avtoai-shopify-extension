import store from "./store.js"

class ProductObserver {
    constructor() {
        this.productTag = "a"
        this.missedProductsList = []
    }

    startSearchingForUnseenProducts() {
        const main = document.querySelector("main")
        const products = main ? main.getElementsByTagName(this.productTag) : document.getElementsByTagName(this.productTag)

        const filteredProducts = store.productLinkStore.filterProductElements(products)
        this.missedProductsList = store.productLinkStore.getBackup()

        document.addEventListener("scroll", () => {
            Array.from(filteredProducts).forEach((product) => {
                const rect = product.getBoundingClientRect()
                if(this.isInViewport(rect))
                    this.missedProductsList = store.productLinkStore.update(product.href)
            })
        })

        this.urlCheck()
    }

    urlCheck() {
        if(!Array.isArray(this.missedProductsList)) return

        const urls = [window.location.href.split("#")[0], window.location.href.split("?")[0]]
        urls.forEach((url) => {
            const index = this.missedProductsList.indexOf(url)
            if(index != -1)
                this.missedProductsList = store.productLinkStore.deleteItemWithIndex(index)
        })
    }

    isInViewport(rect) {
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        )
    }

    findFirstAvailableLink() {
        for(let i = 0; i < this.missedProductsList.length; i++) {
            if(!store.productLinkStore.productClickedStore.isProductClicked(this.missedProductsList[i])){
                return i
            }
        }
    }

    nextProduct() {
        if(this.missedProductsList.length == 0) return
        const firstIndex = this.findFirstAvailableLink()
        this.missedProductsList.splice(firstIndex, 1)
    }

    getProductRecommendation(productEvent) {
        if(!Array.isArray(this.missedProductsList)) return

        productEvent(this.missedProductsList.length == 0 ? null
         : this.missedProductsList[this.findFirstAvailableLink()])
    }
}

export default ProductObserver