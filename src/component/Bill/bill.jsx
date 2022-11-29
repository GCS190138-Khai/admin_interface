import { useState, memo } from "react";
import BillList from "../../admin/billList";
import BillNavbar from "./Bill_Navbar";

function Bill() {

  const [navState, setNavState] = useState('pending')
  
  return ( <div className="d">
    <div className=" flex justify-center w-full border-2">
      <BillNavbar action={setNavState} ></BillNavbar>
    </div>
    <BillList navState={navState}></BillList>
  </div> );
}

export default memo(Bill);