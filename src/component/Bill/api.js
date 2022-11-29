import { useMutation, useQueryClient } from "react-query";
import { hotReload, URL } from "../../createInstance";



const thisURL = `${URL}/bill` 


const updateBill = async ({axiosJWT,data,currentUser,id}) =>{
  try {
    
    const res = await axiosJWT.put(`${thisURL}/update`,data,{
      headers:{
        token:`Bearer ${currentUser.accessToken}`
      },
      params: { id: id }
    })
    return res.data
  } catch (error) {
    console.log(error)
    return error
  }
}

export const useBillMutation = () =>{


  return useMutation(updateBill,{
    onSuccess:(data)=>{
      return hotReload()
    },
    onMutate:({setListOfBill})=>{
      return ()=> setListOfBill(false)
    }
  })
}