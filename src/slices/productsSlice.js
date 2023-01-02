import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

export let fetchProducts = createAsyncThunk('products/fetchProducts',async ()=>{
   let reponse = await axios.get('http://localhost:8000/products')
   return [...reponse.data]
})
export let searchProducts = createAsyncThunk('products/searchProducts',async (value)=>{
    let reponse = await axios.get('http://localhost:8000/products?title_like='+value+'&_limit=16')
    console.log(value)
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
        searchedProducts:[],
        status:'idle',
        searchedProductsStatus:'idle',
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
            state.searchedProductsStatus='loading'
            
        }).addCase(fetchProducts.fulfilled,(state,action)=>{
            state.status='secceded'
            state.searchedProductsStatus='secceded'
            let prds = action.payload.map((p)=>{
                return p 
            })
            prds.reverse()
            state.products=prds
            state.searchedProducts=prds
        }).addCase(fetchProducts.rejected,(state,action)=>{
            state.status='failed'
            state.searchedProductsStatus='failed'
            state.err=action.error.message
        })
        builder.addCase(searchProducts.fulfilled,(state,action)=>{
            state.searchedProductsStatus='secceded'
            let prds = action.payload.map((p)=>{
                return p 
            })
            state.searchedProducts=prds
        }).addCase(searchProducts.rejected,(state,action)=>{
            state.searchedProductsStatus='failed'
            state.err=action.error.message
        })
    }

})
export default productsSlice.reducer
export const{setStatus} = productsSlice.actions