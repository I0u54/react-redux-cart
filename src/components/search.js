import Shop from "./shop"

import {useSelector,useDispatch} from 'react-redux'
import { fetchProducts,searchProducts } from '../slices/productsSlice'
import { useEffect, useState } from 'react'
export default function Search(){
  
    let dispatch = useDispatch()
    let cart = useSelector((state)=>state.cart.cart)
    let data = useSelector((state)=>state.products.searchedProducts)
    let status = useSelector((state)=>state.products.searchedProductsStatus)
  
    let search = (e)=>{
     
      
        dispatch(searchProducts(e.target.value))
     
    }
    useEffect(()=>{
        if(status=='idle'){
            dispatch(fetchProducts())
        }
       
        localStorage.setItem('cart',JSON.stringify(cart))

    },[status,dispatch,cart])
   
    return(
        <>
        <div className="container" style={{marginTop:"70px"}}>
        <input type="text" className='form-control w-75 m-auto mb-2 shadow-none ' placeholder='Chercher des produits ...'  onChange={(e)=>{search(e)}}/>
        {data.length > 0 ? <Shop c={cart} d={data} s ={status}/>: <h1 className="text-center text-uppercase mt-5 mb-5">not found</h1> }
           

        </div>
           

        </>
    )
}