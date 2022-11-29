import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
 

import { useForm } from "react-hook-form";
import {   registerUser } from '../api';
import '../component/account/this.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { createAxios } from '../createInstance';
import ButtonBack from '../component/Ultity/BackButton';

function UpdateUser() {
  const currentUser = useSelector((state)=>state.auth.login.currentUser)

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    password:"",
    repassword:""  
  });
 
  
  const [isShowPass, setisShowPass] = useState(false)
  const [isCormfim, setisCormfim] = useState(true)
  const [messageErrOfUsername, setMessageErrOfUsername] = useState(true)
  const [messOfEmail, setmessOfEmail] = useState(true)
  const [thisUser, setthisUser] = useState(false)
  const [isChangePass, setisChangePass] = useState(false)
 const [err, setErr] = useState(false)
  const dispatch =useDispatch()
  const navigate = useNavigate()
  const  {userID} = useParams()
  let axiosJWT =  createAxios(currentUser,dispatch)
  const handleLogin= async (data)=>{ 
      let newUser
      
      if(currentUser.role==="1" && isChangePass){
        
         newUser ={
  
          address:data.address,
          name:data.name,
      
          password:data.password,
          phone:data.phone.trim()
  
      }
   
      }else{
      
        newUser ={
     
           address:data.address,
           name:data.name,
           phone:data.phone.trim()
   
       };
       
      }
      let packages ={
        role:currentUser.role,
        updatePack: newUser
      }
      try {
    
        const res = await axiosJWT.post(`https://api.phobendoi.art/api/auth/update/`+userID,packages,{
        });
      
        alert(`Upadate thành công user: ${res.data.username}`)
    } catch (error) {
        console.log(error)
    }
    // loginUser(newUser,dispatch)
  //  const res = await  registerUser(newUser,dispatch,false,false,navigate)

      
  }
useEffect(()=>{

    (async () => {
      try {
        const res = await axiosJWT.post('https://api.phobendoi.art/api/user/find/'+userID,currentUser,{
          
            headers:{
                token:`Bearer ${currentUser.accessToken}`
            }
        
        })
   
        setthisUser(res.data)
        
        return 
      } catch (error) {
    
        setErr(error.response.data)
       
        return   
      }
  
      
    })();
 


},[userID])
  useEffect(()=>{
      const subscription= watch((data)=>{
        setmessOfEmail(true)
        setMessageErrOfUsername(true)
          if(data.password!==data.repassword){
            setisCormfim(false)
          }
          if(data.password===data.repassword){
            setisCormfim(true)
          }
      })
      return ()=>{
        subscription.unsubscribe()
      }
  },[watch])
  const handleDelete = ()=>{

    let text = "Hành động này không thể hoàn tác, bạn có chắc chắn muốn thực hiện ?";
  if (window.confirm(text) === true) {
    (async () => {
      let packages ={
        role:currentUser.role,
       
      }
      try {
        await axiosJWT.post('https://api.phobendoi.art/api/user/delete/'+userID,packages)
   
        alert("xóa thành công")
        navigate('/adminPhobendoi/allUser')
        return 
        
      } catch (error) {
        alert(error.response.data)
      }
   
      
    })();
  } else {
    return
  }

  
  }
  return (  
    <div className="dv"> 
    <ButtonBack></ButtonBack>
      {thisUser?<form onSubmit={handleSubmit((e)=>{
       
        handleLogin(e)
      })} className=' flex flex-col gap-[15px] h-fit w-[57.2vw]  '>
                <div className=' cont_input   '>
                  <input defaultValue={thisUser.name} className=' bg-primary pb-[0.875vh] focus:border-primaryBlack  focus:ring-0 w-full  inp' {...register("name",{required:"*Đây là trường bắt buộc"})} type="text" placeholder='   Họ & Tên*' 
                   />
                      
                <p className=' text-aCaption font-title2-caption text-[#FF0000]'>{errors.name?.message}</p> 
                </div>
                <div className=' cont_input   '>
                  <input defaultValue={thisUser.address||""} className=' bg-primary pb-[0.875vh] focus:border-primaryBlack  focus:ring-0 w-full  inp' {...register("address",{})} type="text" placeholder='   Địa Chỉ*' 
                   />
                      
                <p className=' text-aCaption font-title2-caption text-[#FF0000]'>{errors.name?.message}</p> 
                </div>
                {/**/}
                <div className=' cont_input   '>
                  <input readOnly value={thisUser.email} className=' bg-primary pb-[0.875vh] focus:border-primaryBlack  focus:ring-0 w-full  inp' {...register("email", {required:"", pattern: { 
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message:"*Email không hợp lệ"
                  }})} type="text" placeholder='   Email*' 
                   />
                      
                <p className=' text-aCaption font-title2-caption text-[#FF0000]'>{messOfEmail?errors.email?.message:"*Email được sử dụng. Vui lòng chọn một tên người dùng khác."}</p> 
                <p className='text-aCaption font-title2-caption ' >*Mọi tương tác với Phố Bên Đồi đều sẽ được thực hiện thông qua email này. Hãy chắc rằng bạn là chủ sỡ hữu hiện tại của nó.</p>
                </div>
                {/*  */}
                <div className=' cont_input   '>
                  <input  defaultValue={thisUser.phone} className=' bg-primary pb-[0.875vh] focus:border-primaryBlack  focus:ring-0 w-full  inp' {...register("phone",{required:"*Đây là trường bắt buộc",min:{
                    value:9,
                    message:"*Số điện thoại phải có ít nhất 9 chữ số"
                  }})} type="tel" placeholder='   Số Điện Thoại*' 
                   />
                      
                <p className=' text-aCaption font-title2-caption text-[#FF0000]'>{errors.phone?.message}</p> 
                </div>
                <div className=' cont_input   '>
                  <input readOnly value={thisUser.username} className=' bg-primary pb-[0.875vh] focus:border-primaryBlack  focus:ring-0 w-full  inp' {...register("username",{required:"*Đây là trường bắt buộc"})} type="text" placeholder='   Tên Người Dùng*' 
                   />
                      
                <p className=' text-aCaption font-title2-caption text-[#FF0000]'>{messageErrOfUsername?errors.username?.message:"*Tên người dùng đã được sử dụng. Vui lòng chọn một tên người dùng khác."}</p> 
                </div>
                {/* repassword */}
                
                {isChangePass?<div>

                { currentUser.role==="1"? <div className='    cont_input '>
                  <div className=' flex flex-col items-end justify-center '>

                 <input  className=' bg-primary pb-[0.875vh] focus:border-primaryBlack focus:ring-0 w-full inp ' 
                 {...register("password",{ required:"Đây là trường bắt buộc",
                  pattern: {
                    value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.* ).{8,16}$/i,
                    message: "*Mật khẩu phải có độ dài từ 8 đến 16 kí tự, ít nhất một chữ cái viết hoa, một chữ số"
                  }})} type={isShowPass?"text":"password"} placeholder='   nếu không cần cập nhật mật khẩu vui lòng để trống*' 
                 />
                 <span onClick={()=>setisShowPass(!isShowPass)} className='  cursor-pointer text-aCaption font-[600] absolute w-fit h-fit'> {isShowPass?"Ẩn":"Hiện"}</span>
                  </div>
              
                <p className=' self-start text-aCaption font-title2-caption text-[#FF0000]'>{errors.password?.message}</p> 
                </div>:""}
                {/*  */}
               {currentUser.role==="1"?  <div className='    cont_input '>
                  <div className=' flex flex-col items-end justify-center '>

                 <input className=' bg-primary pb-[0.875vh] focus:border-primaryBlack focus:ring-0 w-full inp ' 
                 {...register("repassword",{ required:"Đây là trường bắt buộc"
                  
                })} type={isShowPass?"text":"password"} placeholder='   nếu không cần cập nhật mật khẩu vui lòng để trống*' 
                 />
                 <span onClick={()=>setisShowPass(!isShowPass)} className='  cursor-pointer text-aCaption font-[600] absolute w-fit h-fit'> {isShowPass?"Ẩn":"Hiện"}</span>
                  </div>
              
                <p className=' self-start text-aCaption font-title2-caption text-[#FF0000]'>{isCormfim?errors.repassword?.message:"*Mật khẩu không khớp"}</p> 
                </div>:
                <div className=" text-red-600 ">
                  Cảnh báo: Bạn không thể thực hiện chức năng này !
                  <div className='  text-red-600'>
                    Vui lòng liên hệ với admin có quyền cao nhất về thông tin cho tiết !
                  </div>
                </div>
                }
                <button className=' text-red-600 underline' onClick={()=>setisChangePass(false)}>Hủy</button>
                </div>     
                :
                <div className="d">
                  <button className=' text-green-600 underline' onClick={()=>setisChangePass(true)} >Đổi password</button>
                </div>
                }
              
                <div className=' spacer h-[6vh]'></div>
                <div className=' flex gap-[4rem]'>

                <button  type='submit'   className=' w-fit flex cursor-pointer'> <img className=" ml-[-0.5rem] object-contain h-[2rem] w-[2rem] " src={ "https://live.staticflickr.com/65535/52252454497_7a572f16d1_o.png" } alt="" /> <u className="mt-[0.8rem] font-bold text-[0.875rem]">Cập nhật</u> </button>
                {currentUser.role==="1"? <span onClick={()=>handleDelete()}    className=' cursor-pointer w-fit flex '> <img className=" ml-[-0.5rem] object-contain h-[2rem] w-[2rem] " src={ "https://live.staticflickr.com/65535/52252454497_7a572f16d1_o.png" } alt="" /> <u className="mt-[0.8rem] font-bold text-[0.875rem]">Xóa</u> </span>:""}
                </div>
            </form>:
            <div className="di">{err||"Loading..."}</div>
            }
    </div>
  );
}

export default UpdateUser;