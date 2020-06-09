import { v4 } from 'https://deno.land/std/uuid/mod.ts' // v4 is object that generate data from id
import { Product } from '../types.ts';
let products: Product[] = [
    {
        id: "1",
        name: "Product One",
        description: "This is product one",
        price: 19.99,
    },
    {
        id: "2",
        name: "Product Two",
        description: "This is product two",
        price: 29.99,
    },
    {
        id: "3",
        name: "Product Three",
        description: "This is product three",
        price: 39.99,
    },
];

///////////////// C R U D //////////////////////////////////
// @desc GET all products
// @route GET /api/v1/products
const getProducts = ({ response }: { response: any }) => {
    response.body = {
        sucess: true,
        data: products
    }
}

// @desc GET single product
// @route GET /api/v1/product/:id
const getProduct = ({ params, response }: { params: { id: string }, response: any }) => {
    const product: Product | undefined = products.find(p => p.id === params.id)

    if (product) {
        response.status = 200
        response.body = {
            sucess: true,
            data: product
        }
    } else {
        response.status = 404
        response.body = {
            sucess: false,
            msg: 'No product found'
        }
    }
}

// @desc Add a product
// @route POST /api/v1/product/
const addProduct = async ({ request, response }: { request: any, response: any }) => {
    const body = await request.body()

    if (!request.hasBody) {
        response.status = 400
        response.body = {
            sucess: false,
            msg: 'No data'
        }
    } else {
        const product: Product = body.value
        product.id = v4.generate()
        products.push(product)
        response.status = 201
        response.body = {
            sucess: true,
            data: product
        }
    }
}

// @desc Update a product
// @route PUT /api/v1/product/:id
const updateProduct = async ({ params, request, response }: { params: { id: string }, request: any, response: any }) => {
    const product: Product | undefined = products.find(p => p.id === params.id)

    if (product) {
        const body =  await request.body()

        const updateData: { name?: string; description?: string; price?: number} = body.value

        products = products.map(p => p.id === params.id ? { ...p, ...updateData } : p)

        response.status = 200
        response.body = {
            sucess: true,
            data: products
        }
    } else {
        response.status = 404
        response.body = {
            sucess: false,
            msg: 'No product found'
        }
    }
}

// @desc Delete a product
// @route DELETE /api/v1/product/:id
const deleteProduct = ({ params, response }: { params: { id: string }, response: any }) => {
    products = products.filter(p => p.id !== params.id)
    response.body = {
        sucess: true,
        msg: 'Product removed'
    }
}

export { getProducts, getProduct, addProduct, updateProduct, deleteProduct }
