import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './components/home';
import About from './components/about';
import ContactUs from './components/contact';
import Navbar from './layouts/navbar';
import Profile from './components/profile';
import Footer from './layouts/footer';
// import Demo from './layouts/demo';
import Terms from './components/terms';
import Privacy from './components/privacy';
import CarPost from './components/carpost';
import Booking from './components/booking';
import axios from 'axios';
import { useState } from 'react';
import Loader from './layouts/loader';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reduxStore';
import CarDetails from './components/carDetails';


function App() {
  const [isApiCall, setIsApiCall] = useState(true)
  const dispatch = useDispatch()
  const isLoading = useSelector((state) => state.profile.mainComponentLoading);
  const token = localStorage.getItem('token')
  const getUserDetails = async () => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "http://localhost:8000/users/getUserDetail",
        headers: {
          // "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      };
      const response = await axios.request(config)
      console.log('response.status', typeof response.status)
      if (response.status === 200) {
        const user = response.data.user
        user.profile = [null, '', undefined].includes(user.profile) ? '/assets/profile.png' : `http://localhost:8000/uploads/${user.profile}`
        localStorage.setItem('user', JSON.stringify(user))
        dispatch(actions.setMainComponentFlag(false))
        console.log('here is end')
      }
    } catch (error) {
      console.log(error);
      localStorage.setItem('user', null)
      localStorage.setItem('token', null)
      if (window.location.pathname !== '/') {
        window.location.href = '/'
      }
      dispatch(actions.setMainComponentFlag(false))
    }
  };

  useEffect(() => {
    if (isApiCall) {
      setIsApiCall(false)
      if (![null, undefined, '', 'null'].includes(token)) {
        getUserDetails()
      } else {
        dispatch(actions.setMainComponentFlag(false))
      }
    }
  }, [isApiCall])

  if (isLoading) {
    return <Loader fullScreen={true}/>
  }
  return (
    <BrowserRouter>
      <div style={{
        maxHeight: '90vh',
        overflowY: 'scroll'
      }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<About />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/carPost" element={<CarPost />} />
        <Route path="/booking" element={<Booking />} />
        <Route path='/car/:carId' element={<CarDetails />} />
      </Routes>
      </div>
      <div style={{
        position: 'fixed',
        width: '100%',
        bottom: 0
      }}>
      <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
