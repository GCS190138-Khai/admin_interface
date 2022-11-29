import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'rc-table';

import { useForm } from "react-hook-form";
import axios from 'axios';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { parseISO } from 'date-fns/esm';
import { createAxios, iconCheck, iconEdit, iconPackaged, iconShipping, toVND } from '../createInstance';
import UpdateGiftcode from './updateGiftCode';
import { useNavigate } from 'react-router-dom';
import {useBillMutation} from '../component/Bill/api'
import { useJWT } from '../component/Ultity/hooks';


function BillList({navState}) {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [listOfBill, setListOfBill] = useState(false)
    const navigate = useNavigate()
    const {dispatch,userState} = useJWT()
    const currentUser = useSelector(userState)
    const axiosJWT = createAxios(currentUser,dispatch)
    const billMutation = useBillMutation()
      // useEffect(()=>{
      //   setNavListState(navState)
      // },[navState])
//  const success = ()=>{
//   setIUpdate(false)
//  }
//   const getOne = async (id)=>{
//     console.log(id)
  
//     const res =  await axios.get('https://phobendoi.art/api/discount/'+id)
//     setIUpdate(res.data)
//     return 
//   }
const hanleUpdateBill = async (val,id,status)=>{
  let data ={...val,status:status}
  
 return  billMutation.mutate({axiosJWT,data,currentUser,id,setListOfBill})
}
  const cellStyle ="py-3 px-6 border-r border-black"
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width:300,
      className:cellStyle
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 200,
      className:cellStyle,
      render:(val,row,i)=>{
        
        let time =   parseISO(val) 
      
        const prse = format(time,"dd-MM-yyy / HH:mm",{locale: vi})
       
          return prse
 
      
      }
    },
    {
      title: 'Tổng',
      dataIndex: 'tolal_cost',
      key: 'tolal_cost',
      width: 120,
      className:cellStyle,
      render:(val,row,i)=>{
        return toVND(val)},
    },
    {
      title: 'Địa chỉ ship đến',
      dataIndex: 'shipmentDetail',
      key: 'shipmentDetail',
      width: "30%",
      className:cellStyle,
      render:(val)=>{
        return val.fullAdress
      }
    },

    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 50,
      className: cellStyle,
      render:(val,row,i)=>{
       
        if(val==='pending'){
            return <span className=' px-6 py-3 text-aButtonVw bg-primaryBlack text-white'>{val}</span>
        }
        if(val==="repare"){
          return <span className=' px-6 py-3 text-aButtonVw text-primaryBlack bg-primaryYellow '>{val}</span>
      }
      
      if(val==="shipping"){
        return <span className=' px-6 py-3 text-aButtonVw text-primary bg-purple-600  '>{val}</span>
    }
    
    if(val==="done  "){
      return <span className=' px-6 py-3 text-aButtonVw text-primary bg-green-500'>{val}</span>
  }
  
        
       }
    },
    {
      title: 'actions',
  
      key: 'edit',
      width: "20%",
      className: cellStyle,
      render:(val,row,i)=>{
       
            return (
            <div  className="flex justify-between">

              <span onClick={()=> navigate(`/adminPhobendoi/thisbill/${val._id}`)} className=' cursor-pointer '>{iconEdit()}</span>
              <span onClick={()=>hanleUpdateBill(val,val._id,"repare")} className=' cursor-pointer '>{iconPackaged()} </span>
              <span onClick={()=>hanleUpdateBill(val,val._id,"shipping")} >{iconShipping()}</span>
              <span onClick={()=>hanleUpdateBill(val,val._id,"done")}>{iconCheck()}</span>
            </div>)
      
       },
     
    }
  ]
     
  
  useEffect(()=>{
  
    (async () => {
        
      const res =  await axios.get('https://api.phobendoi.art/api/bill')
      const filterData= res.data.filter((item)=>item.status===navState)
      return   setListOfBill(filterData)  
    
    })();

  },[navState])

  return (  
    <div className="dv flex flex-col gap-36"> 

     <div>
        {!listOfBill? <div>Loading....</div> :<Table onRow={((e,i)=>{

        })} rowClassName='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400' className='w-full text-sm text-left text-gray-500 dark:text-gray-400' tableLayout="auto" columns={columns} data={listOfBill} ></Table>}
      </div>
   
        
    </div>
  );
}

export default BillList;