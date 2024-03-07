export async function fetchByProductHandleAndVariantId({productHandle, variantId}) {
  console.log(productHandle, variantId)
    const response = await fetch(`/products/${productHandle}.js`)
    if(!response.ok) return null
    const product = await response.json()

    const variant = variantId ? product.variants.find(v => v.id === parseInt(variantId)) : null

    let image = variant ? variant.featured_image ? variant.featured_image.src : null : null
    if (!image) {
      if (product.featured_image)
        image = product.featured_image
      else if (product.images.length > 0)
        image = product.images[0]
    }

    console.log(variant, product, image)

    const variantDetails = {
      title: variant ? variant.name : product.title,
      variantId: variant ? variant.id : product.variants[0].id,
      price: variant ? variant.price / 100 : product.variants[0].price / 100,
      imageUrl: image ? image.startsWith("https:") ? image : `https:${image}` : null
    }

    return variantDetails
}

export async function fetchProductAndVariantDetails(codeOutput) {
    if (codeOutput.trim().length === 0) return

    const data = JSON.parse(codeOutput)

    if (Array.isArray(data)) {
      let details = []

      data.forEach(async product => {
        const productHandle = typeof product === 'string' ? product : product.handle
        const variantId = typeof product === 'string' ? null : 
          product.variant_id ? product.variant_id.split("/").pop() : null
        const res = await fetchByProductHandleAndVariantId({productHandle, variantId})
        if(res) details.push(res)
      })

      return details
    }
    else if(typeof data === 'object') {
      const productHandle = data.handle
      const variantId = data.variant_id ? data.variant_id.split("/").pop() : null
      const res = await fetchByProductHandleAndVariantId({productHandle, variantId})
      return [res]
    }
}

export async function addItemToCart(variantId, quantity) {
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
