import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { WishlistProvider } from './context/WishlistContext.jsx'
import {Toaster} from "react-hot-toast";
import { OrderProvider } from './context/OrderContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <OrderProvider>
    <WishlistProvider>
    <CartProvider>
        <App />
        <Toaster
  position="top-right"
  reverseOrder={false}
  toastOptions={{
    duration: 2500,
    style: {
      background: "#ffffff",
      color: "#374151",
      border: "1px solid #f9a8d4",
      borderRadius: "16px",
      padding: "16px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    },
    success: {
      iconTheme: {
        primary: "#ec4899",
        secondary: "#fff",
      },
    },
  }}
/>
    </CartProvider>
    </WishlistProvider>
    </OrderProvider>
    </AuthProvider>
  </StrictMode>,
)
