import { getProductFetchDetails } from "../helpers/product"

export async function fetchByProductHandleAndVariantId({ productHandle, variantIds }) {
  try {
    const response = await fetch(`/products/${productHandle}.js`)
    if (!response.ok) {
      console.error(`Failed to fetch product: ${response.statusText}`)
      return null
    }
    const product = await response.json()

    const filteredVariants = variantIds ? variantIds.length > 0 ? product.variants.filter(v => variantIds.includes(v.id)) : null : null

    let details = []
    product.variants.forEach(v => {
      let image = v ? v.featured_image ? v.featured_image.src : null : null
      if(!image){
        if (product.featured_image)
          image = product.featured_image
        else if (product.images.length > 0)
          image = product.images[0]
      }

      details.push({
        displayName: v.name ? v.name : product.title,
        id: v.id,
        options: v.options,
        price: v.price ? v.price / 100 : product.price / 100,
        imageUrl: image ? image.startsWith("https:") ? image : `https:${image}` : null
      })
    })
    return {
      defaultVariantId: filteredVariants ? filteredVariants[0] ? filteredVariants[0].id : null : null,
      variants: details,
      options: product.options
    }
  }
  catch (error) {
    console.error(`Error fetching product details for handle "${productHandle}": ${error.message}`)
    return null
  }
}

export async function fetchProductAndVariantDetails(codeOutput) {
  if (codeOutput.trim().length === 0) return []

  const promises = getProductFetchDetails(codeOutput, fetchByProductHandleAndVariantId)
  const data = await Promise.all(promises)
  return data.filter(details => details !== null)
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
