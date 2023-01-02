import { useEffect, useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'

import { addToCart,increment } from '../slices/cartSlice'
import { Link } from 'react-router-dom'
export default function Shop({c,d,s}){
    let dispatch = useDispatch()
    
    let cart =c
    let data = d
    let status = s


   
    
    
    let adc = (id)=>{
        let f = false
        data.map((d)=>{
            if (d.id == id){
                
                cart.map((c)=>{
                   
                    if (c.id == id){
                        f = true
                      
                       
                        
                        if(d.quantity > c.quantity){
                            dispatch(increment(id))
                          
                            

                        }
                        else{
                            alert('this is the max you can add')
                          
                        }
                       
                    }
                

                })

                if (f == false){
                   
                  
                    let obj = {
                        id:d.id,title:d.title,prix:d.prix,quantity:1,image:d.image
                    }
                    dispatch(addToCart(obj))
                }
               
                
            }
        })
        

    }
    return(
        <div className="container">
        { status !="secceded" ? <h1>Loading...</h1> :
        <>
        
       
        <div className="products">
            {data.slice(0,12).map((d)=>(
              
                    
                 <div className="product">
                   <Link to={`/productDetails/${d.id}`}><img src={require(`./images/${d.image}`)} alt="" /></Link>
                 <div className="text">
                     <h2>{d.title}</h2>
                     {d.quantity > 0 ? <h5>{d.quantity} en stock</h5> :<h5 style={{color:'red'}}>Out of stock</h5>}
                    
                     
                     <h4>{d.prix} MAD</h4>
                     {d.quantity > 0 ?  <span className="icon" onClick={()=>{adc(d.id)}}><i className="bi bi-cart"></i></span>:<span className="icon"><i className="bi bi-eye"></i></span>}
                    
                     <div className="stars">
                         <i className="bi bi-star-fill"></i>
                         <i className="bi bi-star-fill"></i>
                         <i className="bi bi-star-fill"></i>
                         <i className="bi bi-star-fill"></i>
                         <i className="bi bi-star-fill"></i>
                     </div>
                 </div>
             </div>
            ))}
        </div></>
        }

        </div>
      

        
    )
    
}