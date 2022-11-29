import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { createAxios } from "../../createInstance";
import { useJWT } from "../Ultity/hooks";
import BackButton from '../Ultity/BackButton'
import SubmitButton from "../Ultity/SubmitButton";
import { useMutationGenres } from "./api";

function CreateGenres() {

  const { register,handleSubmit ,formState: { errors } } = useForm()
 const { dispatch,userState} = useJWT()
  const currentUser = useSelector(userState)
  const axiosJWT = createAxios(currentUser,dispatch)
  const genresMutation = useMutationGenres()
  
  const hanleCreate = (payload)=>{
    genresMutation.mutate({axiosJWT,currentUser,payload})
  }
  return ( 
    <div className="div">
      <div><BackButton></BackButton> </div>
      
      <div className=" h-8" ></div>
      <form onSubmit={handleSubmit((e)=>{
        hanleCreate(e)
      })}>
      
      <div className=' cont_input   '>
                    <input className=' pb-[0.875vh] focus:border-primaryBlack  focus:ring-0 w-full  inp' {...register("name",{required:"*Đây là trường bắt buộc"})} type="text" placeholder=' tên thể loại' 
                     />
                        
  {  errors&&<p className=' text-aCaption font-title2-caption text-[#FF0000]'>{errors.name?.message}</p> }
                  </div>

                  <div className=" h-8" ></div>
                <SubmitButton name={"Tạo thể loại mới"}></SubmitButton>
      </form>
    </div>
   );
}

export default CreateGenres;