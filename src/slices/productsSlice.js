import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

export let fetchProducts = createAsyncThunk('products/fetchProducts',async ()=>{
   let reponse = await axios.get('http://localhost:8000/products')
   return [...reponse.data]
})
export let updateProduct = createAsyncThunk('products/updateProduct',async (data)=>{
    let id  =data.id
     await axios.put('http://localhost:8000/products/'+id,data)
  

    
 })

const productsSlice = createSlice({
    name:'products',
    initialState:{
        products:[],
        status:'idle',
        err:null
    },
    reducers:{
        setStatus:(state)=>{
            state.status='idle'

        }
        

    },
    extraReducers(builder){
        builder.addCase(fetchProducts.pending,(state,action)=>{
            state.status='loading'
        }).addCase(fetchProducts.fulfilled,(state,action)=>{
            state.status='secceded'
            let prds = action.payload.map((p)=>{
                return p 
            })
            state.products=prds
        }).addCase(fetchProducts.rejected,(state,action)=>{
            state.status='failed'
            state.err=action.error.message
        })
    }

})
export default productsSlice.reducer
export const{setStatus} = productsSlice.actions