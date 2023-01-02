import {useSelector,useDispatch} from 'react-redux'
import { fetchProducts,searchProducts } from '../slices/productsSlice'
import { useEffect, useState } from 'react'
import Shop from './shop'
export default function Home (){
    let dispatch = useDispatch()
    let cart = useSelector((state)=>state.cart.cart)
    let data = useSelector((state)=>state.products.products)
    let status = useSelector((state)=>state.products.status)
    useEffect(()=>{
     
        if(status=='idle'){
            dispatch(fetchProducts())
        }
        localStorage.setItem('cart',JSON.stringify(cart))

    },[status,dispatch,cart])
    return(
        <div className="container"  style={{marginTop:"70px"}}>
            <section className='firstSection'>
                <div className="intro">
                    <h1>the thrift l<span style={{color:'#088178'}}>&#10084;</span>vers </h1>

                </div>
              
                <div className="twoImages">
                    <div className="zoom">
                        <img src={require('./images/a15.jpg')} />

                    </div>
                    <div className="zoom">
                         <img src={require('./images/a4.jpg')} /> 
                   
                    </div>
                    
                   

                </div>
            </section>
            <section className='firstSection mt-5'>
                <h1 style={{textTransform:'capitalize'}} className="mb-3">Derniers produits :</h1>
                <Shop c={cart} d={data} s ={status}/>

            </section>
            

        </div>
        
    )
}