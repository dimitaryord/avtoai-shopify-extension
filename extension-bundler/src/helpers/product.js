export function getProductFetchDetails(codeOutput, fetchByProductHandleAndVariantId) {
    const code = codeOutput.replaceAll(':', " : ")

    const variantIdPattern = /[",',\s,{,\\[]variant_id[",',\s]\s*:\s*[",',\s].*?\/(\d+)[",',\s,},\]]|[",',\s,{,\\[]id[",',\s]\s*:\s*[",',\s].*?\/(\d+)[",',\s,},\]]/g;
    const handlePattern = /[",',\s,{,\\[](product_handle|handle)[",',\s]\s*:\s*[",',\s](.*?-.+?)[",',\s,},\]]/g

    const handles = new Set()
    const variantIds = new Set()

    let match

    while((match = handlePattern.exec(code)) !== null){
        handles.add(match[2])
    }

    while((match = variantIdPattern.exec(code)) !== null){
        const id = match[1] ? parseInt(match[1], 10) : parseInt(match[2], 10)
        if (!isNaN(id)) {
            variantIds.add(id)
        }
    }

    const promises = Array.from(handles).map(
        handle => fetchByProductHandleAndVariantId({ productHandle: handle, variantIds: Array.from(variantIds) })
        .catch(() => null)
    )
    return promises
}