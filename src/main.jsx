import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './utils/store.js'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
<Provider store={store}>
    <BrowserRouter>
        <App />
        <Toaster/>
    </BrowserRouter>
</Provider>
)