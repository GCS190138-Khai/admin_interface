import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useDispatch, useSelector } from "react-redux"
import { createAxios, URL } from "../../createInstance"
import { useJWTAndUser } from "../Ultity/hooks"


const thisURL = `${URL}/products`
export const api_option = {
   
  
  staleTime:Infinity
}

export const  useCurrentUser = async  ()=>{
  const currentUser = await   useSelector((state)=>state.auth.login.currentUser)
 
  return currentUser
}
export const  useCurrentUserPure =  ()=>{
  
 
  return useSelector((state)=>state.auth.login.currentUser)}
export const useAxiosJWT =  ()=>{
  const currentUser =  useSelector((state)=>state.auth.login.currentUser)
  const dispatch =  useDispatch()
  const axiosJWT =   createAxios(currentUser,dispatch)
  return axiosJWT
}
export const getAllProductsAdmin = async (axiosJWT,currentUser)=>{
try {
  
  const res = await axiosJWT(`${thisURL}/admin_products`,{
    headers:{
      token:`Bearer ${currentUser.accessToken}`
  }
  })

  const products= await res.data

  return products

} catch (error) {
  console.log(error)
   return error
}

}
export const getAllProductsAdminVer2 = async ({axiosJWT,currentUser,search})=>{
  try {


    if(!search){ 
     
      const res = await axiosJWT(`${thisURL}/search_admin`,{
        headers:{
          token:`Bearer ${currentUser.accessToken}`
      },
      
      })
      
      const products= res.data
      return products
    }else{
      const res = await axiosJWT(`${thisURL}/search_admin`,{
        headers:{
          token:`Bearer ${currentUser.accessToken}`
      },
      params: { search: search }
      })
   
      const products= res.data
      return products
    }
  
  
  } catch (error) {
      console.log(error)
  }
  
  }
export const useProductsQuery  = (currentUser,axiosJWT) =>{ 
  

 
return useQuery(["products"], ()=> getAllProductsAdmin(axiosJWT,currentUser),api_option)}


// ---------
export const getOneProductsAdmin = async (id)=>{
  try {
    const res = await axios.get(`${thisURL}/`+id)
    const product= res.data
    return product
  
  } catch (error) {
    console.log(error)
  }
  
}
export const useOneProductQuery = (id) => useQuery(["product"],
()=>getOneProductsAdmin(id),{
  refetchOnMount:"always",
  staleTime:Infinity
})
//--------------

export const getGenreses = async () =>{
  try {
    const res = await axios.get(`${URL}/genres/admin_all`) 

    const genres = res.data
    return genres
  } catch (error) {
    
  }
}

export const useGenres =()=> useQuery(["genres"],getGenreses,api_option)



export const useMutationProducts = () =>{
  const queryClient = useQueryClient()
  
  return useMutation(getAllProductsAdminVer2,{
    onSuccess:(data)=>{
      const newArr = queryClient.getQueryData(["newArr"])
      if(data.length===0) return queryClient.setQueryData(["products"],[])
      if(!newArr) return queryClient.setQueryData(["products"],data)
      if(newArr.length===0) return queryClient.setQueryData(["products"],data)

      const finalData = data.filter((i)=>{
        const check = i.genres.some(r=>newArr.indexOf(r.name)>=0)
        
        if(check){ 
         
         return i
       }else{
         return console.log()
       }
        
       })
       return queryClient.setQueryData(["products"],finalData)
    }
  })
}


export const getProductUpdate = async ({product})=>{

    const newProduct = await product
  return newProduct

}
export const useUpdateProduct = (refetch) =>{
  const queryClient = useQueryClient()
  
  return useMutation(getProductUpdate,{
    onMutate:({product,rawData})=>{
     
      queryClient.setQueryData(["product"],{...rawData,product})
      return
    },

    onSuccess:(data)=>{
      refetch()
      
    }
  })
}