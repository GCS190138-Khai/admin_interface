import { useDispatch } from "react-redux";
import { createAxios } from "../../createInstance";
import AddButton from "../Ultity/AddButton";
import { useJWTAndUser } from "../Ultity/hooks";
import { useAxiosJWT, useCurrentUserPure, useProductsQuery } from "./api";
import ProductTable from "./ProductsTable";

function AllProducts() {

  // const useCurrentUser = useCurrentUserPure()
  // const dispatch = useDispatch()
  // const axiosJWT = createAxios(useCurrentUser,dispatch)

  const { currentUser,axiosJWT } = useJWTAndUser()
  const {isError, isSuccess ,isLoading,data,error,isFetching } = useProductsQuery(currentUser,axiosJWT)
  

  if(isLoading){  

    return (  
  
      <div className="div">Loading...</div>
    );
  }
  if(isFetching){  

    return (  
  
      <div className="div">Loading...</div>
    );
  }
  if(isError){
   
    return (  
  
      <div className="div">{error.message}</div>
    );
  }  
  if(isSuccess){

    return (  
  
  
      <div className="v">
        
        {data &&
        <div className="">
        <AddButton to={"newProduct"}></AddButton>
        <ProductTable data={data} ></ProductTable>
        </div>
     }
      </div>
    );
  }
}

export default AllProducts;