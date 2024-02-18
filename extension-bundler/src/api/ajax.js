export async function fetchProductAndVariantDetails({ productHandle, variantId }) {
    try {
        const response = await fetch(`/products/${productHandle}.js`)
        const product = await response.json()

        const variant = product.variants.find(v => v.id === parseInt(variantId))
        if (!variant) return

        let image = variant.featured_image
        if (!image) {
            if(product.featured_image)
                image = product.featured_image
            else if(product.images.length > 0)
                image = product.images[0]
        }

        const variantDetails = {
            title: variant.name,
            imageUrl: image ? image.startsWith("https:") ? image : `https:${image}` : null
        }

        return variantDetails
    } catch (error) {
        throw new Error('Error fetching product details: ' + error)
    }
}

export async function addItemToCart(variantId, quantity){
    const data = {
        items: [{
          id: parseInt(variantId),
          quantity: quantity
        }]
    }

    try {
        const response = await fetch('/cart/add.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
    
        if (response.ok) {
          const cart = await response.json()
          console.log('Item added to cart', cart)
        } else {
          console.error('Failed to add item to cart. Status code:', response.status)
        }
      } catch (error) {
        console.error('Error adding item to cart:', error)
      }
}
