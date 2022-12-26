import { useEffect, useState } from "react"
import {useSelector} from 'react-redux'
import { NavLink } from "react-router-dom"
export default function Header(){
    let cart = useSelector((state)=>state.cart.cart)
    let [count,setCount]= useState(localStorage.getItem('cart')!=undefined ? JSON.parse(localStorage.getItem('cart')).length:0)
    useEffect(()=>{
        setInterval(function(){
            
            
      
            setCount(localStorage.getItem('cart')!=undefined ? JSON.parse(localStorage.getItem('cart')).length:0)
        

    },200)
   

    })
   
       
   
    return(
        <>
        
            <header> 
                <NavLink to='/'><h1>THTHLO</h1></NavLink>
                
                <NavLink to="/cart" className="sh"><i className="bi bi-cart" ></i> <span className="badge" style={{backgroundColor:"#088178"}}>{count}</span></NavLink>
            </header>
           
        </>
    )

}