export function getProductFetchDetails(codeOutput, fetchByProductHandleAndVariantId) {
    const code = codeOutput.replaceAll(':', " : ")

    const variantIdPattern = /[",',\s,{,\\[]variant_id[",',\s]\s*:\s*[",',\s].*?\/(\d+)[",',\s,},\]]|[",',\s,{,\\[]id[",',\s]\s*:\s*[",',\s].*?\/(\d+)[",',\s,},\]]/g;
    const handlePattern = /[",',\s,{,\\[](product_handle|handle)[",',\s]\s*:\s*[",',\s](.*?-.+?)[",',\s,},\]]/g

    const handles = []
    const variantIds = []

    let match

    while((match = handlePattern.exec(code)) !== null){
        handles.push(match[2])
    }

    while((match = variantIdPattern.exec(code)) !== null){
        const id = match[1] ? parseInt(match[1], 10) : parseInt(match[2], 10)
        if (!isNaN(id)) {
            variantIds.push(id)
        }
    }

    const promises = handles.map(
        handle => fetchByProductHandleAndVariantId({ productHandle: handle, variantIds }).catch(() => null)
    )
    return promises
}