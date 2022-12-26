import { useEffect, useState } from "react"
import {useSelector,useDispatch} from "react-redux"
import { fetchProducts } from '../slices/productsSlice'
import {deleteFromCart,increment,decrement} from '../slices/cartSlice'
export default function Cart(){
   
    let dispatch = useDispatch()
    let cart = useSelector((state)=>state.cart.cart)
    let data = useSelector((state)=>state.products.products)
    let status = useSelector((state)=>state.products.status)

    let [total,setTotal] = useState(0)
    useEffect(()=>{
        localStorage.setItem('cart',JSON.stringify(cart))
        if(status=='idle'){
            dispatch(fetchProducts())

        }
      
        let t = 0
         
      
        cart.map((c)=>{
            t+=c.prix * c.quantity
            setTotal(t)
        })
    },[cart])
    let incrementQ = (id)=>{
        cart.map((c)=>{
            if(c.id == id){
                data.map((d)=>{
                    if(d.id == c.id){
                        if (d.quantity > c.quantity){
                            dispatch(increment(c.id))
                        }
                        else{
                            alert('this is the max ')
                        }
                    }
                })
              
            
            }
            
        })
        

    }
    return(
        <>
            <div class="banner mt-5">
                <h1>#PANIER</h1>
        
            </div>
            {cart.length>0? <div className="container mt-3">
           <table className="table text-center table-borderless" style={{borderBottom:"2px solid lightgray"}}>
            <thead>
                <tr style={{borderTop:" 1px solid lightgray",borderBottom :"1px solid lightgray"}}>
                    <th>Suprimer</th>
                    <th>Image</th>
                    <th>Titre</th>
                    <th>Prix</th>
                    <th>Quantité</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {cart.map((c)=>(
                    <tr>
                        <td>
                            <i className="bi bi-x-circle" style={{fontSize:"25px",cursor:"pointer"}} onClick={()=>{dispatch(deleteFromCart(c.id))}}></i>
                        </td>
                        <td><img src={require(`./images/${c.image}`)} width="80px"/></td>
                        <td>{c.title}</td>
                        <td>{c.prix} MAD</td>
                        <td><button className="btn"onClick={()=>{dispatch(decrement(c.id))}} >-</button>{c.quantity}<button className="btn" onClick={()=>{incrementQ(c.id)}}>+</button></td>
                        <td>{c.prix * c.quantity} MAD</td>
                    </tr>
                ))}

            </tbody>
           </table>
           <div className="pay">
           <table className="table  w-50 mt-5 ">
                <tbody>
                <tr>
                        <th>Panier Total</th>
                        <td>{total} MAD</td>
                    </tr>
                    <tr>
                        <th>Livraison</th>
                        <td>30 MAD</td>
                    </tr>
                    <tr>
                        <th>Sous-Total</th>
                        <td>{total +30} MAD</td>
                    </tr>
                    <tr>
                        
                    </tr>

                </tbody>
                    
           </table>
         
                    <button className="btn" style={{backgroundColor:"#088178",color:"#fff"}}>Commander</button>
           </div>

          
        </div>:<h1 className="text-center mt-3 ">le panier est vide </h1>}
           
        </>
       
    )
}