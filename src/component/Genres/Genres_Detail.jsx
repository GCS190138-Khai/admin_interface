import { useState } from "react";
import { useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createAxios } from "../../createInstance";
import { useAxiosJWT, useProductsQuery } from "../Product/api";
import ProductTable from "../Product/ProductsTable";
import ButtonBack from "../Ultity/BackButton";
import Error from "../Ultity/Error";
import { useCount, useJWT } from "../Ultity/hooks";
import Loading from "../Ultity/Loading";
import TbCell from "../Ultity/styled_td";
import { error_text } from "../Ultity/text";
import UpdateButtonState from "../Ultity/UpdateButtonState";
import { useGetOneGenres } from "./api";
import UpdateGenres from "./Genres_Update";

function GenresDetail() {

  const { genresId} = useParams()
  const { data,status } = useGetOneGenres(genresId)
  const { dispatch,userState} = useJWT()
  const currentUser = useSelector(userState)
  const axoisJWT= createAxios(currentUser,dispatch)
  const {data:productsList,status:productStatus} = useProductsQuery(currentUser,axoisJWT)
  const count = useCount()
  const [isUpdate, setisUpdate] = useState(false)
  if(status==='error') return <Error data={error_text}></Error>
  if(status==='loading') return <Loading></Loading>
 
  if(status==='success'){
    if(productStatus==='error') return <Error data={error_text}></Error>
    if(productStatus==='loading') return <Loading></Loading>

    if(productStatus==='success'){
      const {products} = count(productsList,data.name)
      return ( 
        <div className="di">
          {data&&
          <div className=" flex flex-col">
            <div></div>
              <ButtonBack></ButtonBack>
              <div className="flex justify-between">
  
              <TbCell className={" text-4xl"} data={`Tên thể loại: ${data.name}`}></TbCell>
              <UpdateButtonState action={()=>setisUpdate(true)}></UpdateButtonState>
              </div>
            <div>
              {isUpdate?
              <UpdateGenres axoisJWT={axoisJWT} currentUser={currentUser}  data={data} back={()=>setisUpdate(false)} ></UpdateGenres>:
              <ProductTable data={products} subData={data.name} read={true} ></ProductTable>
                
              }
            </div>
          </div>
  
          }
        </div>
       );
    }
   
  }
}

export default GenresDetail;