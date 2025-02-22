import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'
import { productsApi } from '../../api/productsApi'

const ListProducts = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const alert = useAlert()

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            setLoading(true)
            const { success, products } = await productsApi.getAllData()
            if (success && isMounted) {
                setProducts(products)
                setLoading(false)
            } else {
                setLoading(false)
            }
        }
        fetchData()
        return () => isMounted = false
    }, [])

    const deleteData = async (id) => {
        const data = await productsApi.deleteData(id)
        if (data.success) {
            alert.success("Product Deleted")
            setProducts(products.filter(product => product._id !== id))
        }
    }

    return (
        <>
            { loading ? <h1>Loading...</h1> : (
                <>
                    <h1>Products</h1>
                    <div className='card-container'>
                        <table>
                            <thead>
                                <th>ID</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </thead>
                            <tbody>
                                {products.length > 0 ? products.map(product => (
                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>
                                            <img src={product?.images[0].path ? product.images[0].path : ''} className="img-fluid" width="50px" />
                                        </td>
                                        <td>{product.name}</td>
                                        <td>{product.category}</td>
                                        <td>{product.price}</td>
                                        <td>
                                            <Link to={`/products/${product._id}`}>
                                                <button>View</button>
                                            </Link>
                                            <Link to={`/admin/product/${product._id}`}>
                                                <button>Edit</button>
                                            </Link>
                                            <button onClick={() => deleteData(product._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                                    : <>No Products</>
                                }
                            </tbody>

                        </table>
                    </div >
                </>
            )}
        </>
    )
}

export default ListProducts
