import { useEffect, useState } from "react"
import {useSelector,useDispatch} from "react-redux"
import { fetchProducts } from '../slices/productsSlice'
import {deleteFromCart,increment,decrement,cartClear} from '../slices/cartSlice'
import { postOrder } from "../slices/cartSlice" 
import { updateProduct,setStatus } from "../slices/productsSlice"


export default function Cart(){
   
    let dispatch = useDispatch()
    let cart = useSelector((state)=>state.cart.cart)
    let data = useSelector((state)=>state.products.products)
    let status = useSelector((state)=>state.products.status)
    let [order,setOrder] = useState(false)
    let [name,setName] = useState('')
    let [lastName,setLastName] = useState('')
    let [email,setEmail] = useState('')
    let [adress,setAdress] = useState('')
  

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
    let confirmOrder = ()=>{
        setOrder(true)
    }
    let updatePrd = async (p) =>{
                
        const response = await fetch('http://localhost:8000/products/'+p.id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(p)
        });
       }
   
    let sendOrder = (e)=>{
      
        e.preventDefault()
        if (name=='' || adress=='' || email == '' || lastName==''){
            alert('tous les champs sont obligatoire ')
        }
        else{
        
        let obj = {
            nom:name,
            prenom:lastName,
            emailAd:email,
            adress:adress,
            prds:cart,
            total:total+30
        }
        dispatch(postOrder(obj))
      cart.map((c)=>{
        data.map((d)=>{
            if(c.id == d.id){
                
               
                    let updatedProduct = {
                        id:d.id,
                        title: d.title,
                        quantity:d.quantity-c.quantity,
                        prix: d.prix,
                        image:d.image
                        
                    }
                    dispatch(updateProduct(updatedProduct))
                
           }

            
          
        })

      })
      setOrder(false)
      dispatch(setStatus())
      document.querySelector('.alert').style.left=0
      setTimeout(()=>{
        document.querySelector('.alert').style.left="-150%"

      },4000)
      
       
     
    
        }
        

       
        

    }
    return(
        <div className="container" style={{marginTop:'70px'}}>
        <div className="alert alert-success alert-dismissible fade show mt-4" role="alert">
        <strong>Bien!</strong> vous avez passer une commande .
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
            <div class="banner mt-5">
                <h1>#PANIER</h1>
        
            </div>
            {cart.length>0? (!order ? <div className="container mt-3">
               
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
               <div style={{display:'flex'}}> <button className="btn" style={{backgroundColor:"#088178",color:"#fff",marginRight:"5px"}} onClick={()=>{confirmOrder()}}>Commander</button><button className="btn" style={{backgroundColor:"#088178",color:"#fff"}} onClick={()=>{dispatch(cartClear())}}>Clear</button></div>
             
                       
               </div>
    
              
            </div> : <div className="container w-75 mt-5">
            <form>

  <div className="row mb-4">
    <div className="col">
      <div className="form-outline">
      <label className="form-label" htmlFor="form3Example1">Nom</label>
        <input type="text" id="form3Example1" className="form-control"  onChange={(e)=>{setName(e.target.value)}} />
       
      </div>
    </div>
    <div className="col">
      <div className="form-outline">
        <label className="form-label" htmlFor="form3Example2" >Prenom </label>
        <input type="text" id="form3Example2" className="form-control"  onChange={(e)=>{setLastName(e.target.value)}}/>
       
      </div>
    </div>
  </div>


  <div className="form-outline mb-4">
  <label className="form-label" htmlFor="form3Example3" >Email </label>
    <input type="email" id="form3Example3" className="form-control"  onChange={(e)=>{setEmail(e.target.value)}} />
   
  </div>


  <div className="form-outline mb-4">
  <div class="mb-3">
  <label htmlFor="exampleFormControlTextarea1" class="form-label" >Adress</label>
  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(e)=>{setAdress(e.target.value)}}></textarea>
</div>
  </div>


  


  <button type="submit" className="btn  btn-block mb-4"  style={{backgroundColor:"#088178",color:"#fff"}} onClick={(e)=>{sendOrder(e)}}>Confirmer </button>



</form>
            </div> ) :<h1 className="text-center text-uppercase mt-5 mb-5">le panier est vide </h1>}
           
        </div>
       
    )
}
