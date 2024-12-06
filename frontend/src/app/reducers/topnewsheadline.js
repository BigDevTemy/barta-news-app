import { createSlice } from "@reduxjs/toolkit"

const topnewsheadlineSlice = createSlice({
  name: "topnewsheadline",
  initialState: {
    topnewsheadline: null,
    topstories:null,
    recentnews:null,
    break:null,
    featurednews:null,
    lifestyle:null
    
  },
  reducers: {
    setTopnewsHeadline(state, action) {
        
        state.topnewsheadline = action.payload
    },
    setTopstories(state, action) {
        
      state.topstories = action.payload
    },
    setRecentNews(state, action) {
          
      state.recentnews = action.payload
    },
    setLifeStyle(state, action) {
          
      state.lifestyle = action.payload
    },
    setBreak(state, action) {
            
      state.break = action.payload
    },
    setFeaturedNews(state, action) {
            
      state.featurednews = action.payload
    },
      
  clearTopnewsHeadline:(state)=>{
      state.topnewsheadline = null,
      state.topstories = null,
      state.break = null
      state.recentnews = null,
      state.featurednews = null,
      state.lifestyle = null

    },
      
    
  }
})

export const { setTopnewsHeadline ,setTopstories,setRecentNews,setFeaturedNews,setBreak,setLifeStyle,clearTopnewsHeadline} = topnewsheadlineSlice.actions
export default topnewsheadlineSlice.reducer