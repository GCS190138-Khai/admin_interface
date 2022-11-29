

import Dropdown from "./Shop_Dropdown";
import EditDetail from "../Ultity/EditDetail";

import ProductDate from "./Product_Date";
import ProductGenres from "./Product_Genres";
import ProductImage from "./Product_Image";
import ProductName from "./Product_Name";
import ProductOption from "./Produc_Option";
import ProductsSearch from "./Product_Search";


function  ProductTable ( {data,read,subData}) {



 


    

      return (
        <div className="">
          {data &&
          <table  className=" w-full">
          <thead className=" border-2">
              <tr className=" border-2">
                <th className=" text-left px-2 py-4 w-[20%]">Tên sản phẩm <br></br> 
                ProductCode
                <br></br>
                {read?``:<ProductsSearch></ProductsSearch>}
                </th>
                <th className=" text-left px-2 py-4 w-[20%] ">Các option</th>
                <th className=" text-left px-2 py-4 w-[30%] ">Thể loại
                <br/>
               {read?`-> ${subData}`:<Dropdown  ></Dropdown>}
                </th>
                <th className=" text-left px-2 py-4 w-[10%]">Ngày tạo</th>
                <th className=" text-left px-2 py-4 w-[15%] " >Hình</th>
                <th className=" text-left px-2 py-4 w-[5%] " >Edit</th>
              </tr>
            </thead>
            <tbody>
            {
              data.map((item,i)=>{
                return (
                  <tr className=" border-b border-primaryBlack" key={item._id}>
                  <td className="align-text-top flex gap-2 ">
                    <div className=" px-2 py-4">{`${i+1}`}</div>
                  <ProductName item={item} status={true} ></ProductName>
                  </td>  
                  <td className=" align-text-top">
                  <ProductOption  item={item}></ProductOption>
                    </td> 
                  <td className="align-text-top">
                  <ProductGenres item={item}></ProductGenres>
                    </td>  
                  <td className="align-text-top">
                    <ProductDate item={item}></ProductDate>
                    </td> 
                  <td className="">
                  <ProductImage item={item}></ProductImage>
                    </td>
                  <td>
                  <EditDetail  to={`/adminPhobendoi/thisproduct/${item._id}`} ></EditDetail>
                    </td>
                </tr>
                )
              })
            }
            </tbody>
          </table >
          }
        </div>
      )
 
}

export default ProductTable;