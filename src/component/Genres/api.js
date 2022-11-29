import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { URL } from "../../createInstance";
import { getGenreses } from "../Product/api";

const thisURL = `${URL}/genres`

export const getOneGenres = async (id) =>{
  try {
    const res = await axios.get(`${thisURL}/gen/`+id)
    return res.data
  } catch (error) {
    console.log(error)
    return error
  }
}

export const useGetOneGenres = (id)=> useQuery(["one_genres"],()=>getOneGenres(id),{
  refetchOnMount:"always",
  staleTime:Infinity
})
export const createGenres = async ({axiosJWT,currentUser,payload})=>{
  try {
      const res = await  axiosJWT.post(`${thisURL}/`,payload,{
        headers:{
          token:`Bearer ${currentUser.accessToken}`
      },
      })
      return res.data
  } catch (error) {
      console.log(error)
      return error
  }
}
export const updateGenres = async  ({axiosJWT,currentUser,newGen,id}) =>{
  try {
  
    const res = await  axiosJWT.put(`${thisURL}/update/gen`,newGen,{
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
export const useMutationGenres = () =>{
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  return useMutation(createGenres,{
    onSuccess:async (data)=>{ 
        const newGenList = await getGenreses()
        await queryClient.setQueryData(["genres"],newGenList)
      return  navigate('/adminPhobendoi/genres')
    },
 
  })
}
export const useMutationUpdateGen = () =>{
 
  return useMutation(updateGenres,{
    onSuccess: (data)=>{ 
      
      return   window.location.reload(false)
    },
 
  })
}