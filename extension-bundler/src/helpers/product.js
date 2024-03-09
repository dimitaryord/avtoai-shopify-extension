import { fetchByProductHandleAndVariantId } from "../api/ajax";

export async function getProductFetchDetails(product) {
    const productHandle = typeof product === 'string' ?
        Array.isArray(product) ? product[0] : 
        product : product.handle ? product.handle : product.product_handle ? product.product_handle : null;
    const variantId = typeof product === 'string' ? null : Array.isArray(product) ? null :
        product.variant_id ? product.variant_id.split("/").pop() : null
    return fetchByProductHandleAndVariantId({ productHandle, variantId }).catch(() => null)
}