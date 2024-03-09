import { getProductFetchDetails } from "../helpers/product"

export async function fetchByProductHandleAndVariantId({ productHandle, variantIds }) {
  try {
    const response = await fetch(`/products/${productHandle}.js`)
    if (!response.ok) {
      console.error(`Failed to fetch product: ${response.statusText}`)
      return null
    }
    const product = await response.json()

    const variants = variantIds ? variantIds.length > 0 ? product.variants.filter(v => variantIds.includes(v.id)) : null : null

    if(!variants || variants.length === 0) 
      return [{
        title: product.title,
        variantId: product.variants[0].id,
        price: product.variants[0].price / 100,
        imageUrl: product.featured_image ? product.featured_image : product.images.length > 0 ? product.images[0] : null
      }]

      let details = []

      variants.forEach(v => {
        let image = v ? v.featured_image ? v.featured_image.src : null : null
        if(!image){
          if (product.featured_image)
            image = product.featured_image
          else if (product.images.length > 0)
            image = product.images[0]
        }

        details.push({
          title: v ? v.name : product.title,
          variantId: v ? v.id : product.variants[0].id,
          price: v ? v.price / 100 : product.variants[0].price / 100,
          imageUrl: image ? image.startsWith("https:") ? image : `https:${image}` : null
        })
      })

      return details
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
