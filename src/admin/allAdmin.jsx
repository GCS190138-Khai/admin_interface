import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'rc-table';

import { useForm } from "react-hook-form";
import axios from 'axios';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { parseISO } from 'date-fns/esm';
import { toVND } from '../createInstance';
import UpdateGiftcode from './updateGiftCode';
import { useNavigate } from 'react-router-dom';
import ButtonBack from '../component/Ultity/BackButton';



function AllAdmin() {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [listGiftCode, setlistGiftCode] = useState(false)
    const navigate = useNavigate()


  const cellStyle ="py-3 px-6 border-r border-black"
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width:300,
      className:cellStyle,
      render:(val,row,i)=>{
        if(row.role==="1"){
          return <span className=" text-[#FF4500] bg-[#FFFFE0] rounded-lg px-1 py-1 ">{val}</span>
        }else{
          return val
        }
      }
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
      title: 'email',
      dataIndex: 'email',
      key: 'email',
      width: 120,
      className:cellStyle,
      render:(val,row,i)=>{
        return val},
    },
    {
      title: 'phone',
      dataIndex: 'phone',
      key: 'phone',
      width: 80,
      className:cellStyle,
      render:(val,row,i)=>{
        return val},
    },
    {
      title: 'role',
      dataIndex: 'role',
      key: 'role',
      width: 80,
      className:cellStyle,
      render:(val,row,i)=>{
        return val},
    },
 

    {
      title: 'xem chi tiết',
  
      key: 'edit',
      width: 50,
      className: cellStyle,
      render:(val,row,i)=>{
      
            return <span className=' cursor-pointer '><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg></span>
      
       },
       onCell:(e,i)=>{ 
        return{
            onClick:  async()=>{
              navigate(`/adminPhobendoi/thisUser/${e._id}`)
            }
            }
        },
    }
  ]
      
  
  useEffect(()=>{
    (async () => {
        
      const res =  await axios.get('https://api.phobendoi.art/api/user/admin')
      
      return   setlistGiftCode(res.data)
    
    })();

  },[])

  return (  
    <div className="dv flex flex-col gap-36"> 
      <ButtonBack></ButtonBack>
     <div>
        {!listGiftCode? <div>Loading....</div> :<Table onRow={((e,i)=>{

        })} rowClassName='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400' className='w-full text-sm text-left text-gray-500 dark:text-gray-400' tableLayout="auto" columns={columns} data={listGiftCode} ></Table>}
      </div>
   
        
    </div>
  );
}

export default AllAdmin;