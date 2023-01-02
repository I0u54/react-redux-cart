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
                <div> 
                  
              
                    <NavLink to='/filter'>magasin</NavLink>
                    <NavLink  to='/'>a propos</NavLink>
                    <a href="https://www.instagram.com/is0u54/?hl=fr" target="_blank" rel="noreferrer">Contactez</a>
              
                    <a href='https://github.com/I0u54' target="_blank" rel="noreferrer">crédits</a>
             
              
             
                  

                </div>
            
     
                <NavLink to="/cart" className="sh"><i className="bi bi-cart" ></i> <span className="badge" style={{backgroundColor:"#088178"}}>{count}</span></NavLink>
            
               
                
                
            </header>
           
        </>
    )

}