import React, { useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import axios from 'axios'

const Products = () => {
    const[products,setProducts]=useState([])
    const[search,setSearch]=useState('')
    const api="http://localhost:3000/products"
    useEffect(()=>{
        const getProducts=async()=>{
            const response=await axios.get(api)
            setProducts(response.data);
        }
        getProducts();
    },[])
    const addProducts= async()=>{
      const newProduct={
        id:products.id.length+1,
        title:"Watch",
        price:"999",
        description:"Good Watch",
      }
      await axios.post(api,newProduct)
      setProducts([newProduct,...products])
    }
    const DeleteProduct = async (product) => {
      await axios.delete(`${api}/${product.id}`)
      setProducts(products.filter(x => x.id !== product.id))
    }
    const EditProduct=async(product)=>{
      await axios.get(`${api}/${product.id}`)
    }
    const SearchHandler = (e) =>{
      setSearch(e.target.value)
    }
    const filteredProducts=products.filter(products=>products.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
     <div className="container my-5">
     <button onClick={addProducts} className='btn btn-primary w-100 mb-3'>Add Post</button>
     <input onChange={SearchHandler} className='form-control' type="text" placeholder='Search products...'/>
     <table className='table table-striped table-bordered'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {
            products && filteredProducts.map(product=>{
              return(
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.title}</td>
                  <td>{product.price}$</td>
                  <td>{product.description}</td>
                  <td><img className='img-fluid' src={product.image} alt="" /></td>
                  <td><button onClick={()=>EditProduct(product)} className='btn btn-warning btn-sm'> <FaEdit/> Edit</button></td>
                  <td><button onClick={()=>DeleteProduct(product)} className='btn btn-danger btn-sm'><AiFillDelete/> Delete</button></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
     </div>
    </div>
  )
}
export default Products