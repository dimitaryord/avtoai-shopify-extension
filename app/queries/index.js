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
                        values
                    }
                    description
                    onlineStorePreviewUrl
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
                if (product.productType.trim() !== "") {

                    if (!productTypes.includes(product.productType)) {
                        productTypes.push(product.productType)

                        product.options.forEach(({ name, values }) => {
                            options[product.productType] = { [name]: [...values] }
                        })
                    }
                    else {
                        product.options.forEach(({ name, values }) => {
                            const productTypeOptions = options[product.productType]
                            if (productTypeOptions.hasOwnProperty(name)) {
                                const currentOptions = productTypeOptions[name]
                                values.forEach(value => {
                                    if (!currentOptions.includes(value)) {
                                        currentOptions.push(value)
                                        productTypeOptions[name] = currentOptions
                                        options[product.productType] = productTypeOptions
                                    }
                                })
                            }
                            else {
                                productTypeOptions[name] = [...values]
                                options[product.productType] = productTypeOptions
                            }
                        })
                    }
                }

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

        return { products: allProducts, options: options, productTypes: productTypes };
    } catch (error) {
        throw new Error(error.message);
    }
}