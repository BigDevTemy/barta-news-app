import { configureStore,combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import { persistReducer,persistStore  } from 'redux-persist'
import userdetails from './reducers/userdetails'
import author_n_source from './reducers/author_n_source'
import topnewsheadline from './reducers/topnewsheadline'
// import thunk from 'redux-thunk';
const allreducers = combineReducers({
    userdetails:userdetails,
    author_n_source:author_n_source,
    topnewsheadline:topnewsheadline
    
})

const persistConfig = {
  key:'root',
  storage
}

const persistedReducer = persistReducer(persistConfig,allreducers)


export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
//   middleware: [thunk]
})
export const persistor = persistStore(store)


// export const store = configureStore({
//   reducer: {
//     enterpriseuser:enterpriseuser,
//     staff:staff
//   },
// })