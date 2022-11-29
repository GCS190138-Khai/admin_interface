import { Link } from "react-router-dom";
import {  iconEdit } from "../../createInstance";

function EditDetail({to}) {
  return (  
    <div className=" align-text-top px-2 py-4 w-[5%]">
      <Link to={to}>{iconEdit()}</Link>
      
  </div>
  );
}

export default EditDetail;