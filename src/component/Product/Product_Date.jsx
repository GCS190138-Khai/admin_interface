import { toEE_dd_MM_yyyy } from "../../createInstance";

function ProductDate({item}) {
  return ( 
    <div className=" align-text-top px-2 py-4 ">
    { toEE_dd_MM_yyyy(item.createdAt) }
  </div>
   );
}

export default ProductDate;