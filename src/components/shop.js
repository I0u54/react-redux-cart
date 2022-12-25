import { useEffect, useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { fetchProducts } from '../slices/productsSlice'
import { addToCart,increment } from '../slices/cartSlice'
export default function Shop(){
    let dispatch = useDispatch()
    let cart = useSelector((state)=>state.cart.cart)
    let data = useSelector((state)=>state.products.products)
    let status = useSelector((state)=>state.products.status)
    let error = useSelector((state)=>state.products.err)

   
    useEffect(()=>{
        if(status=='idle'){
            dispatch(fetchProducts())
        }
        localStorage.setItem('cart',JSON.stringify(cart))

    },[status,dispatch,cart])
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
        <div className="container" style={{marginTop:"70px"}}>
        { status =="loading" ? <h1>Loading...</h1> :
        <div className="products">
            {data.map((d)=>(
                 <div className="product">
                 <img src={require(`./images/${d.image}`)} alt="" />
                 <div className="text">
                     <h2>{d.title}</h2>
                     <h5>{d.quantity} en stock</h5>
                     
                     <h4>{d.prix} MAD</h4>
                     <span className="icon" onClick={()=>{adc(d.id)}}><i className="bi bi-cart"></i></span>
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
        </div> 
        }

        </div>
      

        
    )
    
}