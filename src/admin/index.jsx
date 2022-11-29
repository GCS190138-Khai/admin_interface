import React, {  } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'
import InputEvent from '../component/Events/inputEvent'
import { offResgisterMD, onResgisterMD } from '../redux/authSlice'


 function IndexAdmin() {
   const  dispatch = useDispatch()
   const currentUser = useSelector((state)=>state.auth.login.currentUser)

   const [isModal, setisModal] = useState(false)
   const [menu, setmenu] = useState(false)


if(currentUser.role==="1"||currentUser.role==="admin"){

  return (
    <div className='flex flex-col gap-4  h-auto w-screen  '>
    

    <div className=' z-50 w-full'>

    <div className={menu?' fixed z-20 h-screen   flex w-[25%] ':"fixed z-20 h-[auto]  flex w-[5%]"}  >
        {menu?<div className='  px-2 z-20pt-10 h-screen overflow-y-auto  flex-col flex gap-[2vh] bg-white '>

        <div className='  text-center flex flex-col gap-[20px] uppercase text-[1rem] font-semibold'>
            User management
            <div  className= ' w-full   text-center uppercase text-[0.7rem] font-semibold cursor-pointer'>
            <NavLink   onClick={()=>setisModal(false)} className="focus:outline-none   w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" to="createUser">Thêm mới admin</NavLink>
        </div>
        {currentUser.role==="1"?<div  className= ' text-center uppercase text-[0.7rem] font-semibold cursor-pointer'>
            <NavLink   onClick={()=>setisModal(false)} className="focus:outline-none w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" to="allAdmin">Tất cả admins</NavLink>
        </div>:""}
        <div  className= ' w-full  text-center uppercase text-[0.7rem] font-semibold cursor-pointer'>
            <NavLink   onClick={()=>setisModal(false)} className="focus:outline-none w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" to="allUser">Tất cả user</NavLink>
        </div>
        </div>
        <div className='  text-center uppercase text-[1rem] font-semibold'>
            Event
            <div  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            <NavLink   onClick={()=>setisModal(false)} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" to="EventAdmin">Tất cả events</NavLink>
            </div>
            <button className=" w-full focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={()=>setisModal(!isModal)}>Thêm mới event</button>
        </div>
        <div className='  text-center uppercase text-[1rem] font-semibold'>
            Contact
            <div  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            <NavLink  onClick={()=>setisModal(false)} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" to="ContactAdmin">View all contacts</NavLink>
            </div>
        </div>
        <div className='  text-center uppercase text-[1rem] font-semibold'>
            Quản lí phí giao hàng
            <div  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            <NavLink  onClick={()=>setisModal(false)} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" to="city"> Sửa đổi phí giao hàng </NavLink>
            </div>
        </div>
        <div className='  text-center uppercase text-[1rem] font-semibold'>
            Quản lí sản phẩm
            <div  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            <NavLink  onClick={()=>setisModal(false)} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" to="newProduct">Thêm sản phẩm mới</NavLink>
            </div>
            <div  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            <NavLink  onClick={()=>setisModal(false)} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" to="new_giftcode">Giftcode</NavLink>
            </div>
            <div  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            <NavLink  onClick={()=>setisModal(false)} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" to="bill">Quản lí bill</NavLink>
            </div>
            <div  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            <NavLink  onClick={()=>setisModal(false)} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" to="allProducts">Tất cả sản phẩm</NavLink>
            </div>
            <div  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            <NavLink  onClick={()=>setisModal(false)} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" to="genres">Tất cả thể loại</NavLink>
            </div>
            <div  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            <NavLink  onClick={()=>setisModal(false)} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" to="create_genres">Thêm mới thể loại</NavLink>
            </div>
        </div>
        </div>:""}
        <div className=' h-screen flex items-center w-[2rem]'>

        <div onClick={()=>setmenu(!menu)} className={menu?'bg-red-500 h-auto p-[1rem] w-auto rounded-r-xl cursor-pointer':"bg-green-500 h-auto p-[1rem] w-auto rounded-r-xl cursor-pointer"}>{menu?"Đóng":"Mở"}</div>
        </div>
        
    </div>
   {menu? <div onClick={()=>setmenu(false)} className=' z-19 w-full fixed h-screen opacity-30 bg-primaryBlack'></div>:""}
    </div>



    <div className='  pt-40 px-[4rem] h-fit w-full border-2 border-black-800 p-[0.5rem]'>
    {isModal?<InputEvent></InputEvent>:<Outlet></Outlet> } 
    </div>
    </div>
  )
}else{
  return ( <div className="d">


    
  </div> )
}
}
export default IndexAdmin;
