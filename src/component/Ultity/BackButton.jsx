import { useNavigate } from "react-router-dom";

function ButtonBack({action,name}) {
    const navigate = useNavigate()
  return ( 
    <button onClick={()=>navigate(-1)} type="button" className=" w-20 inline-block px-6 py-2.5 bg-gray-800 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out">Back</button>
   );
}

export default ButtonBack;