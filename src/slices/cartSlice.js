import {createSlice} from '@reduxjs/toolkit'
let shake = ()=>{
    let icon = document.querySelector('.sh')
    icon.classList.add('shake')
    setTimeout(function(){
        icon.classList.remove('shake')

    },1200)
}
const cartSlice = createSlice({
    name:"cart",
    initialState:{cart: localStorage.getItem('cart')!= undefined ? JSON.parse(localStorage.getItem('cart')) : []},
    reducers:{
        addToCart:(state,action)=>{

         state.cart.push(action.payload)
         shake()
        
         
        },
        increment:(state,action)=>{
          let ncart = state.cart.map((c)=>{
            if(c.id == action.payload){
                let updatedItem = {
                    ...c,
                    quantity:c.quantity+=1
                }
                return updatedItem
            }
            return c
          })
          state.cart=ncart
          shake()
        }, 
        deleteFromCart:(state,action)=>{
            let filteredCart = state.cart.filter((f)=>f.id != action.payload)
            state.cart=filteredCart
            shake()

            

        },
        decrement:(state,action)=>{
            let ncart = state.cart.map((c)=>{
                if(c.id == action.payload){
                    if(c.quantity >0){
                        let updatedItem = {
                            ...c,
                            quantity:c.quantity-=1
                        }
                        return updatedItem
                       

                    }
                    else{
                        alert('you cant do this ')
                    }
                    
                    
                    
                }
                return c
              })
              state.cart=ncart
              shake()

        }
        
        

    }

})
export default cartSlice.reducer
export const {addToCart,increment,deleteFromCart,decrement} = cartSlice.actions