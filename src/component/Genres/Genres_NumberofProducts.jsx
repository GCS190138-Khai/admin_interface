import {  useSelector } from "react-redux";
import { createAxios } from "../../createInstance";
import {  useProductsQuery } from "../Product/api";
import Error from "../Ultity/Error";
import Loading from "../Ultity/Loading";
import TbCell from "../Ultity/styled_td";
import { error_text } from "../Ultity/text";
import {  useCount, useJWT } from "../Ultity/hooks";

function GenresOfProducts({data}) {

const {dispatch,userState} = useJWT()
const currentUser= useSelector(userState)
const count = useCount()

 const axiosJWT = createAxios(currentUser,dispatch)
const {data:products,status} = useProductsQuery(currentUser,axiosJWT)


if(status==='loading') return <Loading></Loading>
if(status==='error') return <Error data={ error_text } ></Error>
if(status==='success'){
const { counts } = count(products,data.name)
  return ( 
    <TbCell data={`${counts} sản phẩm`}>

    </TbCell>
   );}
}

export default GenresOfProducts;