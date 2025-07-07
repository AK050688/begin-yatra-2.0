import { useState } from 'react'
import './App.css'
import { Routes, Route, useLocation} from 'react-router-dom';
import Home from './Routes/Home'
import Navbar from './HaderFooter/Navbar';
import Footer from './HaderFooter/Footer';
import Contactus from './Routes/Contactus';
import Aboutus from './Routes/Aboutus';
import Review from './Routes/Review';
import TermsAndConditions from './Routes/TermsAndCondtions';
import PrivacyPolicy from './Routes/PrivacyPolicy';
import LoginPage from './LoginAndSignup/Login';
import Registration from './LoginAndSignup/Registration';
import Agent from './Agent/Agent';

function App() {

  const location = useLocation()

  const shouldHideNavbarFooter = location.pathname.startsWith("/agent")

  
  return (
    <>

   { !shouldHideNavbarFooter && <Navbar/>}

<Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/contact' element={<Contactus/>}/>
  <Route path='/about' element={<Aboutus/>}/>
  <Route path='/reviews' element={<Review/>}/>
  <Route  path='/terms&condition' element={<TermsAndConditions/>}/>
  <Route  path='/privacy&policy' element={<PrivacyPolicy/>}/>
  <Route  path='/agent/login-agent' element={<LoginPage/>}/>
  <Route  path='/agent/login-agent-registration' element={<Registration/>}/>

  {/*Agent*/}
  <Route  path='/agent' element={<Agent/>}/>
</Routes>
{!shouldHideNavbarFooter  &&  <Footer/> } 
    </>
  )
}

export default App
