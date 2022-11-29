import { useQueryClient } from 'react-query';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { getAllProductsAdmin, useAxiosJWT, useCurrentUser, useGenres, useMutationProducts, useProductsSort } from './api';
import Error from '../Ultity/Error';
import Loading from '../Ultity/Loading';
function Dropdown() {
  const {data,isError,error,isLoading,isSuccess} = useGenres()
  const animatedComponents = makeAnimated();
  const productMutation = useMutationProducts()
  const queryClient = useQueryClient()
  const axiosJWT =  useAxiosJWT() 
  const currentUser =  useCurrentUser() 
  if(isError) return <Error data={error}></Error>
  if(isLoading) return <Loading></Loading>
  if(isSuccess){
    
    
    const worker = async(e)=>{
      let newArr = []
  
      e.map((i)=>{
        return newArr.push(i.name)
      })
      queryClient.setQueryData(["newArr"],newArr)
      const search = queryClient.getQueryData(["searchKey"])
      productMutation.mutate({axiosJWT,currentUser,search})
    }
    return ( <div>
  
    <Select
                    onChange={(e)=>worker(e)}
                    
                    closeMenuOnSelect={true}
                    components={animatedComponents}
                    getOptionLabel={option => option.name}
                    getOptionValue={option => option._id}
                    isMulti
                    options={data}/>
    </div>
  
     );
  }
}

export default Dropdown;