import { memo } from "react";

function BillNavbar({action}) {

const tab = ["pending","repare","shipping","done"]

  return ( 

    <div className="justify-between  flex bg-white px-2 sm:px-4 py-8 dark:bg-gray-900  w-[80%]   left-0  border-gray-200 dark:border-gray-600 ">
      {
        tab.map((item)=>{
          return (
            <div className="">

              <button  type="button" onClick={()=>action(item)} key={item} className="inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out">{item}</button>
            </div>
          )
        })
      }

    </div>
   );
}

export default memo(BillNavbar);