export function getProductFetchDetails(codeOutput, fetchByProductHandleAndVariantId) {
    const variantIdPattern = /"(variant_id|id)"\s*:\s*"(gid:\/\/shopify\/ProductVariant\/(\d+))"/g
    const handlePattern = /"(product_handle|handle)"\s*:\s*"(.*?-.+?)"/g

    const handles = []
    const variantIds = []

    let match

    while((match = handlePattern.exec(codeOutput)) !== null){
        handles.push(match[2])
    }

    while((match = variantIdPattern.exec(codeOutput)) !== null){
        variantIds.push(parseInt(match[2]))
    }

    console.log(handles, variantIds)

    const promises = handles.map(
        handle => fetchByProductHandleAndVariantId({ productHandle: handle, variantIds }).catch(() => null)
    )
    return promises
}