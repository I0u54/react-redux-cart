import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
export let fetchProduct = createAsyncThunk('product/fetchProduct',async (id)=>{
    let reponse = await axios.get('http://localhost:8000/products/'+id)
    return reponse.data
 })
const productSlice = createSlice({
    name:'product',
    initialState:{
        prd:{},
        status:'idle',
        err:null
    },
    extraReducers(builder){
        builder.addCase(fetchProduct.pending,(state,action)=>{
            state.status='loading'
        }).addCase(fetchProduct.fulfilled,(state,action)=>{
            state.prd=action.payload
            state.status='secceded'
           
            
        }).addCase(fetchProduct.rejected,(state,action)=>{
            state.status='failed'
            state.err=action.error.message
        })

    }
    
    
})
export default productSlice.reducer 