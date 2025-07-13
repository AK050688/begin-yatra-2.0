import React from 'react';
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
import Wheredoyouwant from './components/Booking/Wheredoyouwant';
import SelectDate from './components/Booking/SelectDate';
import WhoIsComeingWithYou from './components/Booking/WhoIsComeingWithYou';
import SpendTime from './components/Booking/SpendTime';
import TripItinerary from './components/Booking/TripItinerary';
import WnatToGOForm from './components/WnatToGOForm';

function App() {

  const location = useLocation()

  const shouldHideNavbarFooter = location.pathname.startsWith("/agent") || location.pathname.startsWith("/*")

  
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

{/*Booking Routes */}
<Route path='/*location' element={<Wheredoyouwant/>}/>
<Route path='/*select-date' element={<SelectDate/>}/>
<Route path='/*peoples' element={<WhoIsComeingWithYou/>}/>
<Route path='/*spend-time' element={<SpendTime/>}/>
<Route path='/*trip-itinerary' element={<TripItinerary/>}/>
<Route path='/get-quote' element={<WnatToGOForm/>}/>


  {/*Agent*/}
  <Route  path='/agent' element={<Agent/>}/>
</Routes>
{!shouldHideNavbarFooter  &&  <Footer/> } 
    </>
  )
}

export default App
