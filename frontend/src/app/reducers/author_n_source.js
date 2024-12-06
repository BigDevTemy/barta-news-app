import { createSlice } from "@reduxjs/toolkit"

const author_sourceSlice = createSlice({
  name: "author_source",
  initialState: {
    author: [],
    source:[],
    setAmp:"okay"
  },
  reducers: {
   
   
    setAuthor(state, action) {
      const newAuthor = action.payload; // Single author object
    
     
      if(state.author?.length == 0){
        //if the state.author is empty, the newoject should be pushed
        state.author.push(newAuthor);
      }
      else{
        
        const authorExists = state.author.some((author) => author.name === newAuthor.name);
    
        if (!authorExists) {
          // If the author isn't already in the list, add it
          state.author.push(newAuthor);
        }
      }
     
    },
    setSource(state, action) {
      const newSource = action.payload; // Single source object
      
      if(state.source?.length == 0){
        state.source.push(newSource);
      }
      else{
        // Check if the source with the same 'title' already exists in the state
        const sourceExists = state.source.some((src) => src.title === newSource.title);
      
        if (!sourceExists) {
          // If the source isn't already in the list, add it
          state.source.push(newSource);
        }
      }
      
    },
    
    clearSourceAuthorDetails:(state)=>{
      state.author = null
      state.source = null
    },
     
    
  }
})

export const { setAuthor,setSource,clearSourceAuthorDetails} = author_sourceSlice.actions
export default author_sourceSlice.reducer