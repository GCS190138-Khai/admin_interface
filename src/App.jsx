
import './App.css';

import {
  

 
  Outlet
} from "react-router-dom";

import{useEffect, useRef, useState} from 'react'


import {gsap } from 'gsap'
import {        } from "./redux/authSlice";
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getAllEvent    } from './api';
 
import Nabar from './Nabar';
import Footer from './footer';

import { getEventPayment } from './selector';
import { isOffNav, offEventCart } from './redux/navSlice';

gsap.registerPlugin(ScrollTrigger );


function App() {

  const dispatch = useDispatch();
 
 
  const body = useRef(null)
  
 
 
   
   
  const eventCart = useSelector((state)=>getEventPayment(state))
 
  const isOn = useSelector((state)=>state.nav.isOn)

  
  const [isLoading, setIsLoading] = useState(false)

  const width = window.innerWidth




if(isLoading){
  return(
    <div>
      Loading.....
    </div>
  )}else{
   
    if(width<800 ){
      alert('website hiện chưa hỗ trợ giao diện cho tablet và mobile,vui lòng mở rộng cửa sổ giao diện để view website')
      return(
        <> 
        <div className='flex justify-center items-center  text-primaryBlack text-[3rem] w-screen h-screen'>
        Website hiện chưa hỗ trợ giao diện cho tablet và mobile,vui lòng mở rộng cửa sổ giao diện để view website
        </div>
        </>
      )
    }else{

      return (  
        <>
        <div  className="App"  ref={body}>
        <div className=' z-[1000]'>

          {/* {eventCart.isOpen?<EventCart></EventCart>:""} */}
        </div>
         
          <Nabar></Nabar>
 
          <div className=' h-auto -z-10'>
  
       
          <Outlet></Outlet>
          </div>

        </div>
         
          </>
      );
    }
  }
}

export default App;
