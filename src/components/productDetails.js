import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector,useDispatch } from "react-redux"
import { fetchProduct } from "../slices/productSlice"
import { fetchProducts } from "../slices/productsSlice"
import { increment } from "../slices/cartSlice"
import { addToCart } from "../slices/cartSlice"

export default function Product(){
    let {id} = useParams()
    let product = useSelector((state)=>state.product.prd)
    let cart = useSelector((state)=>state.cart.cart)
    let status = useSelector((state)=>state.product.status)
    let data = useSelector((state)=>state.products.products)
    let pstatus = useSelector((state)=>state.products.status)
    let [check,setCheck] = useState(false)
  
    let dispatch = useDispatch()

    useEffect(()=>{
        if(!check){
            dispatch(fetchProduct(id))
            setCheck(true)
        }
      
           

        
           

       
        if(pstatus=='idle'){
            dispatch(fetchProducts())

        }
        localStorage.setItem('cart',JSON.stringify(cart))

      
       
    
    },[cart])
    let adc = (id)=>{
        let found = false
    
        data.map((d)=>{
           
            if(d.id == id){
                cart.map((c)=>{
                    if(c.id == id){
                        found= true
                        if(d.quantity > c.quantity){
                            dispatch(increment(id))

                        }
                        else{
                            alert('max')
                        }
                    }
                })
                
                if(found == false){
                    let obj = {
                        id:d.id,title:d.title,prix:d.prix,quantity:1,image:d.image
                    }
                    dispatch(addToCart(obj))
                }
            }
           

        })


    }
    

    return (
        
        <div className="container" style={{marginTop:"70px"}}>
            
            
        {status !='secceded'?<h1>Loading</h1> :
            <div className="productDetails">

               
                <div className="productImage">
                    <img src={require(`./images/${product.image}`)} alt="" />

                </div>
                <div className="productText">
                    <h2>{product.title}</h2>
                    <h4>{product.prix} MAD</h4>
                    
                    {product.quantity > 0 ? <div> <h3>En stock</h3><button className="btn btn-primary" onClick={()=>{adc(product.id)}}>Ajouter au panier </button> </div>: <h3 style={{color:'red'}}>Out of stock</h3>}
                    <h1>Product Details :</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad sequi ullam facere in, et alias modi, dolore accusantium veritatis eligendi similique aperiam natus at facilis deleniti, dignissimos ea nulla.</p>
                    
                </div>

            </div>}
       
        </ div>
        
    )
}