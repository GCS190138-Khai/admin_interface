import { useForm } from "react-hook-form";
import { createAxios } from "../../createInstance";

import BackState from "../Ultity/BackState";
import { useJWT } from "../Ultity/hooks";

import SubmitButton from "../Ultity/SubmitButton";
import {  useMutationUpdateGen } from "./api";

function UpdateGenres({back,data,currentUser}) {


  const { register,handleSubmit ,formState: { errors } } = useForm({
    defaultValues:{
      name:data.name
    }
  })
  const {dispatch} = useJWT()
  const axiosJWT= createAxios(currentUser,dispatch)
  
   const genresMutationUpdate = useMutationUpdateGen()
   
   const hanleUpdate =  (payload)=>{
    let id = data._id
    let newGen ={}
    if(payload.status==='yes'){

       newGen ={
        name:payload.name,
        status:true
      }
    }else{
      newGen ={
        name:payload.name,
        status:false
      }
    }
    return  genresMutationUpdate.mutate({axiosJWT,currentUser,newGen,id})
    
   }
  return ( 
    <div className="div">
      <BackState action={back}></BackState>
        <div>
        <form onSubmit={handleSubmit((e)=>{
        hanleUpdate(e)
      })}>
      
      <div className=' cont_input   '>
                    <input className=' pb-[0.875vh] focus:border-primaryBlack  focus:ring-0 w-full  inp' {...register("name",{required:"*Đây là trường bắt buộc"})} type="text" placeholder=' tên thể loại' 
                     />
                        
  {  errors&&<p className=' text-aCaption font-title2-caption text-[#FF0000]'>{errors.name?.message}</p> }
                  </div>
      <div className="cont_input">
        <div className="text-4xl">Trạng thái:</div>
        <div className=" flex h-12 items-center gap-2 justify-start">
        <div className=" text-green-500">Acive</div>
      <input defaultChecked={data.status} className=" pb-[0.875vh] focus:border-primaryBlack focus:ring-0 w-8 h-8  inp" {...register("status")} type="radio" value="yes" />
        </div>
        <div className=" flex h-12 items-center gap-2 justify-start">
        <div className=" text-red-500">Inactive</div>
      <input defaultChecked={!data.status} className=" pb-[0.875vh] focus:border-primaryBlack  focus:ring-0 w-8 h-8  inp"  {...register("status")} type="radio" value="no" />
        </div>
      </div>
                  <div className=" h-8" ></div>
                <SubmitButton name={"Cập nhật"}></SubmitButton>
      </form>
        </div>
    </div>
   );
}

export default UpdateGenres;