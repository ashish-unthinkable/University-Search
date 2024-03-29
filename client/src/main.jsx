import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

// import { AuthProvider } from './AuthProvider.jsx'
import { store } from './app/store.js'
import App from './App.jsx'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  // <AuthProvider children={<App/>}></AuthProvider>
  <Provider store={store}>
    <App/>
  </Provider>
    
//  </React.StrictMode>,
)
