import { useEffect, useState } from "react";
import {   useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate,useParams  } from "react-router-dom";
import { offEventCart, onEventCart, primaryBG } from "../../redux/navSlice";
import 'react-calendar/dist/Calendar.css';
 
 
import './arrow.scss'

import { getEventById } from "../../api";

import { getOneEvent } from "../../selector";
 
import { useLayoutEffect } from "react";

import gsap from "gsap";
import { format } from "date-fns";
import { parseISO } from "date-fns/esm";
import { vi } from "date-fns/locale";
import ReadQuillEditor from "../Ultity/ReadOnlyEditor";

function EventDetail() {

  
  

  const [isLoading, setIsLoading] = useState(true)
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const location = useLocation()

  const [tab, settab] = useState(null)
  const { eventID} = useParams()
 
  useLayoutEffect(()=>{
    dispatch(primaryBG())
    
    if(isLoading){
      (async () => {
        await getEventById(dispatch,eventID)
         
        return setIsLoading(false)
      })();
    
      
    }
   },[isLoading])
 

  useEffect(()=>{

    
    const checkTab =()=>{
      if(location.state===null ){
        return settab(null)
      }
       const  {tab} = location.state
        return  settab(tab)
      
    }
    checkTab()

    dispatch(primaryBG())
    return ()=>{
      dispatch(offEventCart())
      
     
    }
  },[])
  

  
  
  
  const currentUser = useSelector((state)=>state.auth.login.currentUser)
  const event = useSelector((state)=>getOneEvent(state)) 
 

 
      


    

  
   
  // arr.length




  const handleEventCart=(event)=>{
      if(!currentUser){
        navigate('/account')
      }
      dispatch(onEventCart(event))

  }



  
 
  if(isLoading){
    return(
      <div className="div">
        loading....
      </div>
    )
  }else{

    return ( 
  
      <div className=" h-[auto] flex pt-[15vh]  px-[10%]  flex-col items-center w-screen bg-primary ">
      
      
      
        <div className="   w-[100%] h-[auto]  flex flex-col  " >
        <div onClick={()=>navigate(-1)} className=" cursor-pointer min-w-[12%] items-center flex gap-3">
         <span className=" flex items-center justify-center "> 
         <img src={require("./ar.png")} alt="error" className=" object-contain h-[18px] w-[18px] " /> 
         </span> 
         <span className="   text-aCaption font-normal uppercase ">{`quay lại ${tab||"tất cả"}`} <div className=" border-t-[1px] mt-[-0.4vh] border-primaryBlack w-[100%]" ></div></span>
        </div>
        <div className=" flex justify-between flex-col w-[100%]  mt-[10vh] h-[60vh]">
  
        <div className=" w-[100%] capitalize text-aTitle2 font-[500] indent-[-0.3vw] " >{`${event.name}`}  </div>
        <div className=" flex text-aCaption uppercase h-[35%]   ">
          <div className=" w-[20%]  ">
            <div className=" font-[600] pb-2">thời gian</div>
            <div className="flex text-aCaption font-title2-caption" >
            <div className=" "> { format( parseISO(event.startDate),"EEEE-dd.MM.yyyy" ,{locale: vi})} </div> 
               
    
            </div>
                <div className="text-aCaption font-title2-caption">{`${event.startHour<10?`0${event.startHour}`:`${event.startHour}`}h${event.startMin<10?`0${event.startMin}`:`${event.startMin}`}`}</div> 
          </div>
          <div className=" w-[32%]  ">
          <div className=" font-[600] pb-2">Địa điểm</div>
          <div className="  w-[90%]" > {event.address} </div>
          </div>
          <div className=" w-[24%]  ">
          <div className=" font-[600] pb-2">Giá vé</div>
          <div>
            {event?.dateRange[0].tickets.map((item,i)=>{
              return (
                <div key={i} className="">
                  {
                    
                 
                  `${item.name}: ${new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(item.cost)} `
                  }
                </div>
                )})}
          </div>
          </div>
  
          <div className=" w-[25%]  flex justify-end ">
              <button onClick={()=>handleEventCart(event)} className=" gap-2 border-[1px] text-aPara font-medium flex justify-center items-center h-[12vh] border-primaryBlack rounded-lg   uppercase w-[18vw] "> đăng ký tham dự  </button>
          </div>
  
        </div>
        </div>
         <div className="  h-[auto] w-[100%]  "> <img className=" rounded-[20px] object-cover w-[100%] h-[100vh] object-center " src={event.heroPic} alt="" /> </div>
         <div className=" mt-[12vh] h-[auto] py-[5%] flex">
          <div className=" text-aCaption font-title2-caption uppercase w-[40%] "> {`(Về sự kiện)`} </div>
          <div className="text-aPara gap-[5vh] flex flex-col   font-p w-[60%]">
      
            <ReadQuillEditor value={event.discription}></ReadQuillEditor>
          </div>
         </div>
         <div className=" pb-[20vh] h-[auto] pt-[10vh] py-[5%] flex">
          <div className=" text-aCaption font-title2-caption uppercase w-[40%] "> {`(với sự tham gia của)`} </div>
          <div className="text-aPara flex flex-col gap-[3vh] font-[500]  w-[60%]">
            {event.artist?.map((item,i)=>{
              return(
                <div key={i} className=" h-[7vh] border-b-[1px] border-black  w-[100%]" >
                  {item}
              </div>
              )
            })}
            
          </div>
          
         </div>
        </div>
         
           
  
      </div>
     );
  }


}

export default EventDetail;