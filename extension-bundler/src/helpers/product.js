export async function getProductFetchDetails(product, fetchByProductHandleAndVariantId) {
    const productHandle = typeof product === 'string' ?
        Array.isArray(product) ? product[0] : 
        product : product.product ? product.product.handle ? 
        product.product.handle :  product.product.product_handle ?  product.product.product_handle : null :
        product.handle ? product.handle : product.product_handle ? product.product_handle : null;
    const variantId = typeof product === 'string' ? null : Array.isArray(product) ? null :
        product.product ? product.product.variant_id ? product.product.variant_id.split("/").pop() : 
        product.product.variants ? product.product.variants[0].id.split("/").pop() : null
        : product.variant_id ? product.variant_id.split("/").pop() :
        product.variants ? product.variants[0].id.split("/").pop() : null
    return fetchByProductHandleAndVariantId({ productHandle, variantId }).catch(() => null)
}