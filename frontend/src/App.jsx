
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AboutPage from './pages/About'
import ContactPage from './pages/ContactPage'
import Menu from './pages/Menu'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminDashboard from './pages/AdminDashboard'
import Orders from './pages/Orders'
import CoffeeBeans from './pages/CoffeeBeans'
import Subscription from './pages/Subscription'
import ScrollToTop from './components/ScrollToTop'
import ScrollToTopOnNavigate from './components/ScrollToTopOnNavigate'

function App() {


  return (

    <>
      <ScrollToTopOnNavigate />
      <ScrollToTop />


      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/beans' element={<CoffeeBeans />} />
        <Route path='/subscription' element={<Subscription />} />
      </Routes>


    </>
  )
}

export default App
