import { useDispatch, useSelector } from "react-redux"
import { createAxios } from "../../createInstance"
import { useCurrentUser } from "../Product/api"

export const useJWT = ()=>{

const dispatch = useDispatch()
const currentUser = state=>state.auth.login.currentUser

return {
  dispatch: dispatch,
  userState:currentUser,

}

}

export const useJWTAndUser =   ()=>{

  const currentUser =  useSelector(state=>state.auth.login.currentUser)
  const dispatch = useDispatch()
   const axiosJWT =  createAxios(currentUser,dispatch)
  return {
    currentUser:currentUser,
    axiosJWT:axiosJWT
  }
}
export const useCount =  () =>{
  


  return (firstArray,key)=> {
    
    let products = []
    firstArray.map((item)=>{
   

       const check=  item.genres.some(r=>r.name===key)
      if(check){
        return products.push(item)
      }else{
        return console.log()
      }
    })
    return{
      products:products,
      counts: products.length
    }
    
}
}