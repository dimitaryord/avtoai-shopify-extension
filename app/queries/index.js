export async function fetchAllProducts(admin) {
    const productTypes = []
    const options = {}

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
                    tags
                    options {
                        name
                        value
                    }
                    description
                    onlineStoreUrl
                    variants(first: 50) {
                        edges {
                          node {
                            id
                            displayName
                            price
                            compareAtPrice 
                            weight
                            availableForSale 
                            requiresShipping 
                            taxable
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
            const products = edges?.map(edge => edge.node)

            products.forEach(product => {
                if(!productTypes.includes(product.productType)) productTypes.push(product.productType)
                product.options.forEach(({name, value}) => {
                    if(options.hasOwnProperty(name)){
                        const currentOptions = options[name]
                    }
                })

                product.variants = product.variants.edges?.map(e => e.node)
            });
            products.forEach(product => product.variants.forEach(variant => {
                variant.selectedOptions.forEach(({ name, value }) => {
                    variant[name.toLowerCase()] = value;
                }); 
                
                delete variant.selectedOptions;
            }));

            allProducts = allProducts.concat(products);

            hasNextPage = data?.products?.pageInfo?.hasNextPage || false;
            if (hasNextPage)
                lastCursor = edges[edges.length - 1].cursor;

        }

        return { products: allProducts };
    } catch (error) {
        throw new Error(error.message);
    }
}