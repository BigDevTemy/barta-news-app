import { createSlice } from "@reduxjs/toolkit"

const userDetailSlice = createSlice({
  name: "userdetails",
  initialState: {
    userdetails: null
  },
  reducers: {
    setUserDetails(state, action) {
        
        state.userdetails = action.payload
      },
      
      clearUserDetails:(state)=>{
        state.userdetails = null
      },
      setUserPreference(state, action) {
        if (state.userdetails) {
          state.userdetails.user_preference = action.payload;
        }
      },
    
  }
})

export const { setUserDetails ,clearUserDetails,setUserPreference} = userDetailSlice.actions
export default userDetailSlice.reducer