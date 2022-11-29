
import { useNavigate, useParams } from "react-router-dom"
import ButtonBack from "../Ultity/BackButton"

import Error from "../Ultity/Error"
import Loading from "../Ultity/Loading"
import RefreshButton from "../Ultity/RefreshButton"
import { useOneProductQuery } from "./api"
import ProductDiscription from "./Product_Discription"
import ProductGenres from "./Product_Genres"
import ProductMoreInfo from "./Product_More_Info"
import ProductName from "./Product_Name"
import ProductPics from "./Product_Pics"
import ProductStatus from "./Product_Status"
import ProductOption from "./Produc_Option"

import UpdateProduct from "./Update_Product"



function ProductDetail() {
  const { productID} = useParams()
 const { isError, isSuccess,isLoading,data,error,refetch } = useOneProductQuery(productID)
const navigate = useNavigate()
if(isError) return <Error data={error}></Error>
if(isLoading) return <Loading></Loading>
if(isSuccess){
  return(
    <div className="d">
      <div className="flex justify-between w-full"><ButtonBack action={()=>navigate(-1)} name={"Back"} ></ButtonBack>
      <RefreshButton></RefreshButton>
      </div>
      <div className=" pt-8 gap-2 flex">

     
      <div className=" w-[49%]"> 
      <div className=" bg-[#f3f2f2] flex gap-32 border rounded-lg px-2 py-2">
        <div>
          <div className=" text-aPara font-caption-600">Title:</div>
        <ProductName item={data}></ProductName>
        </div>
        <div>
          <div className=" text-aPara font-caption-600">Status:</div>
        <ProductStatus item={data}></ProductStatus>
        </div>
        
      </div>
      <div className=" flex gap-32 bg-[#f3f2f2] border rounded-lg px-2 py-2">
        <div>
        <div className=" text-aPara font-caption-600">Thể loại:</div>
          <ProductGenres item={data} ></ProductGenres>
        </div>
        <div>
        <div className=" text-aPara font-caption-600">Thông tin thêm:</div>
          <ProductMoreInfo item={data}></ProductMoreInfo>
        </div>
        
          
      </div>
      <div className=" bg-[#f3f2f2] border rounded-lg px-2 py-2">
          <div className=" text-aPara font-caption-600">Hình ảnh:</div>
     <ProductPics item={data}></ProductPics>

      </div>
      <div className=" bg-[#f3f2f2] border rounded-lg px-2 py-2">
          <div className=" text-aPara font-caption-600">Các option của sản phẩm:</div>
     <ProductOption item={data} pic={true} ></ProductOption>

      </div>
      <div className=" bg-[#f3f2f2] border rounded-lg px-2 py-2">
          <div className=" text-aPara font-caption-600">Discription:</div>
     <ProductDiscription className={" break-words"} item={data}></ProductDiscription>

      </div>
      
      </div>
      <div className="w-[1%]  rounded-lg bg-primaryBlack"></div>
      <div className=" w-[49%]">
        <UpdateProduct refetch={refetch} data={data}></UpdateProduct>
      </div>
      </div>

    </div>
  )
}

} 
export default ProductDetail