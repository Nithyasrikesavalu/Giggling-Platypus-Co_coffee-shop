import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Teaproducts from './components/Teaproducts.jsx'
import CartProvider from './context/CartContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { OrderNotificationProvider } from './context/OrderNotificationContext.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Teaproducts>
            <OrderNotificationProvider>
              <App />
            </OrderNotificationProvider>
          </Teaproducts>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
