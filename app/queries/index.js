export async function fetchAllProducts(admin) {
    let allProducts = [];
    let hasNextPage = true;
    let lastCursor = null;
    const graphqlQuery = `query getAllProducts($first: Int!, $after: String) {
        products(first: $first, after: $after) {
            edges {
                node {
                    id
                    handle
                    title
                    productType
                    descriptionHtml
                    variants(first: 50) {
                        edges {
                          node {
                            id
                            title
                            sku
                            weight
                            availableForSale
                            selectedOptions {
                                name
                                value
                            }
                          }
                        }
                    }
                }
                cursor
            }
            pageInfo {
                hasNextPage
            }
        }
    }`;
    try {
        while (hasNextPage) {
            const res = await admin.graphql(graphqlQuery, {
                variables: {
                    first: 250,
                    after: lastCursor,
                }
            })

            if (!res || res.errors)
                throw new Error("Failed to fetch products");

            const { data } = await res.json();
            const edges = data?.products?.edges;
            const products = edges?.map(edge => edge.node);
            const variantProducts = products?.reduce((vps, p, i) => {
                p.variants.edges.forEach((vp, j) => {
                    vps[i+j] = {
                        id: p.id,
                        product_handle: p.handle,   
                        product_title: p.title,
                        productType: p.productType,
                        descriptionHtml: p.descriptionHtml,
                        variant_id: vp.node.id,
                        variant_title: vp.node.title,
                        sku: vp.node.sku,
                        weight: vp.node.weight,
                        availableForSale: vp.node.availableForSale,
                        selectedOptions: vp.node.selectedOptions
                    };
                });

                return vps;
            }, []);
            allProducts = allProducts.concat(variantProducts);

            hasNextPage = data?.products?.pageInfo?.hasNextPage || false;
            if (hasNextPage)
                lastCursor = edges[edges.length - 1].cursor;

        }

        return allProducts;
    } catch (error) {
        throw new Error(error.message);
    }
}