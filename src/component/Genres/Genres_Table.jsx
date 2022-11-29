import { toEE_dd_MM_yyyy } from "../../createInstance";
import AddButton from "../Ultity/AddButton";
import EditDetail from "../Ultity/EditDetail";
import TbCell from "../Ultity/styled_td";
import GenresOfProducts from "./Genres_NumberofProducts";


function GenresTable({data}) {
  return (  

    <div className="div w-full flex justify-center">
      <div><AddButton to={'create_genres'}></AddButton> </div>
            {data &&
          <table  className=" w-[70%]">
          <thead className=" border-2">
              <tr className=" border-2">
                <th className=" text-left px-2 py-4 w-[20%]">Tên thể loại
                </th>
                <th className=" text-left px-2 py-4 w-[20%] ">Số lượng sản phẩm</th>
                
                <th className=" text-left px-2 py-4 w-[25%]">Ngày tạo</th>
                <th className=" text-left px-2 py-4 w-[25%] " >Ngày sửa đổi gần nhất</th>
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
                    <TbCell data={item.name} ></TbCell>
                  </td>  
                  <td className=" align-text-top">
                  <GenresOfProducts data={item}></GenresOfProducts>
                    </td> 
                  <td className="align-text-top">
                  <TbCell data={toEE_dd_MM_yyyy(item.createdAt)} ></TbCell>
                    </td>  
                  <td className="align-text-top">
                  <TbCell data={toEE_dd_MM_yyyy(item.updatedAt)} ></TbCell>
                    </td> 
                
                  <td>
                  <EditDetail  to={`/adminPhobendoi/thisGenres/${item._id}`} ></EditDetail>
                    </td>
                </tr>
                )
              })
            }
            </tbody>
          </table >
          }
    </div>
  );
}

export default GenresTable;