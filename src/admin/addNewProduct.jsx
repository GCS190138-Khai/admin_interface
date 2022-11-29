import {   useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup'

import { useForm,useFieldArray } from "react-hook-form";
import axios from 'axios';
import { useLayoutEffect } from 'react';
import { getAllGen } from '../api';
import { getAllCate } from '../selector';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import * as yup from  'yup'
import _ from 'lodash';
import { createAxios } from '../createInstance';
import QuillEditor from '../component/Ultity/Editor';
import { useNavigate } from 'react-router-dom';
import ButtonBack from '../component/Ultity/BackButton';

const schema = yup.object().shape({
  pics: yup.mixed().required('Bạn cần phải chọn ít nhất 1 hình')

  .test("1test","Chỉ được add 5 hình",(val)=>{
 
    if(val.length>5){
      return alert("Chỉ được chọn tối đa 5 ảnh")
    }

    return  val
  }),

})
function NewProduct() {
  const currentUser = useSelector((state)=>state.auth.login.currentUser)
  const animatedComponents = makeAnimated();

  const { register, handleSubmit  ,control, formState: { errors } } = useForm({
    defaultValues: {
      pics: ["Hãy dán link vào đây"],
      moreInfo:["Kích thước: 32cmx18cm","Cân nặng: 1.4kg","Chất liệu: giấy mĩ thuật"],
      option:[{
        style:"Phiên bản 1",
        cost:0,
        thumnailPics:"Hãy dán link ảnh vào đây",
        number:0
      }]
    },
    resolver: yupResolver(schema)
  });
   
  

  const {
    fields:moreInfo,
    append:appendMoreInfo,
    remove:removeMoreInfo,
  } = useFieldArray({
    control,
    name: "moreInfo"
  })
  const {
    fields:option,
    append:appendOption,
    remove:removeOption,
  } = useFieldArray({
    control,
    name: "option"
  })


 
  const [isLoading, setLoading] = useState(true);
  
  const listOfCate = useSelector((state)=>getAllCate(state))
  const [listOfGen, setlistOfGen] = useState('')
  const [picList, setpicList] = useState([])
 
  const [imagesList, setImagesList] = useState([]);
  let [nodes, setNodes] = useState('');
  let [delta, setDelta] = useState({});
  const dispatch = useDispatch()
  const navigate = useNavigate()
   useLayoutEffect(()=>{
    if(isLoading){
      (async () => {
       const data = await axios.get('https://api.phobendoi.art/api/products/products_image')
   
      const  newData = data.data.map((e)=>{
          return {...e,isSelected:false}
       })
        
      
        await getAllGen(dispatch)
        setImagesList(newData)
        return setLoading(false)
      })();
    
      
    }
   },[isLoading])
   
   let axiosJWT =  createAxios(currentUser,dispatch)

  const handleAddCity= async(data)=>{ 
 
    let listGen=[]
    listOfGen.map((i)=>{
      return listGen.push(i._id)
    })

    let newVal = []
    _.forEach(data.pics,(file => {
     return newVal.push( `https://api.phobendoi.art/uploads/products/${file.name.trim()}`)
 }))

 let newOption = []
 _.forEach(data.option,(item)=>{
    return newOption.push({...item,thumnailPics:`https://api.phobendoi.art/uploads/products/${item.thumnailPics[0].name.trim()}`})
 })


  
  const   newProduct ={
    name:data.name,
  productCode:data.productCode,
  genres:listGen,
  pics:newVal,
  discription:delta,
  moreInfo:data.moreInfo,
  option:newOption,
  isNewest:data.isNewest,
  isBestSeller:data.isBestSeller,
  isHidden:data.isHidden
  }
    
    const res = await axiosJWT.post('https://api.phobendoi.art/api/products/create',newProduct,{
      headers:{
        token:`Bearer ${currentUser.accessToken}`
    }
    })
    if(!res){
      alert('Tạo thất bại')
    }else{
    await   _.forEach(data.pics, ( async (file)  => {
    
        try {
          const formData = new FormData()
          
          formData.append('name',file.name)
          formData.append('image',file)
   
          const res = await axiosJWT.post('https://api.phobendoi.art/api/products/uploads',formData,{
              
            headers:{
              token:`Bearer ${currentUser.accessToken}`
          }
          })

        } catch (error) {
          return  console.log(error)
        }

    }))
    
   await _.forEach(data.option,async (item)=>{

        try {
          const formData = new FormData()
            formData.append('name',item.thumnailPics[0].name)
            formData.append('image',item.thumnailPics[0])
          const res= await axiosJWT.post('https://api.phobendoi.art/api/products/uploads',formData,{
                
            headers:{
              token:`Bearer ${currentUser.accessToken}`
          }
          })
         
        } catch (error) {
          return console.log(error)
        }
      return 
   })

      alert("Bạn tạo thành công sản phẩm:",res.data.name)
      navigate('/adminPhobendoi/allProducts')
    }
   
   
  }
  const handleDelta =(content, delta, source, editor)=>{
    setNodes(content)
    setDelta(editor.getContents())


}
  if(isLoading){
    return(
      <div className="">
        Loading....
      </div>
    )
  }else{

    return (  
      <div className="dv"> 
      <ButtonBack></ButtonBack>
        <form onSubmit={handleSubmit((e)=>{
         
          handleAddCity(e)
        })} className=' flex flex-col gap-[15px] h-fit w-[57.2vw]  '>
                  <div className=' cont_input   '>
                    <input className=' pb-[0.875vh] focus:border-primaryBlack  focus:ring-0 w-full  inp' {...register("name",{required:"*Đây là trường bắt buộc"})} type="text" placeholder='   Tên sản phẩm' 
                     />
                        
                  <p className=' text-aCaption font-title2-caption text-[#FF0000]'>{errors.name?.message}</p> 
                  </div>
                  <div className=' cont_input   '>
                    <input className=' pb-[0.875vh] focus:border-primaryBlack  focus:ring-0 w-full  inp' {...register("productCode",{required:"*Đây là trường bắt buộc"})} type="text" placeholder='   Mã sản phẩm' 
                     />
                        
                  <p className=' text-aCaption font-title2-caption text-[#FF0000]'>{errors.productCode?.message}</p> 
                  </div>
                  <div className=' cont_input   '>
                  <Select
                  onChange={(e)=>setlistOfGen(e)}
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  getOptionLabel={option => option.name}
                  getOptionValue={option => option._id}
                  isMulti
                  options={listOfCate}/>
                  </div>
                  <div  className=' cont_input   '>
                  <input multiple  type={"file"} className=' rounded-xl pb-[0.875vh] focus:border-primaryBlack  focus:ring-0 w-full  inp' {...register(`pics`,{required:"*Đây là trường bắt buộc"})} />
                    <div className='flex gap-1 w-full'>

                    {picList.map((e)=>{
                      return( 
                        <div className="w-[20%] h-[200px] ">
                          <img  className=" object-fill w-full " src={e} alt="" />
                        </div>
                      )
                    })}
                    </div>
                  </div>
                  <div className=' cont_input   '>
                  <QuillEditor handleDelta={handleDelta} value={nodes}  ></QuillEditor>
                  
                  </div>
                  <div className=' cont_input   '>
                  <ol className='list-decimal list-inside'>
                 {moreInfo.map((item, index) => {
         
                   return (
                      <li className=' h-[10vh] flex flex-col justify-between  ' key={item.id}>
                        <input className=' pb-[0.875vh] focus:border-primaryBlack  focus:ring-0 w-full  inp' {...register(`moreInfo.[${index}]`)} />
                        {index <1?"": <button className=' rounded-lg h-[4vh] bg-red-500 text-primary ' type="button" onClick={() => removeMoreInfo(index)}>
                          Delete
                        </button>}
                      </li>
                    );
                  })}
                   </ol>
                   {moreInfo.length<10?<button
                   type="button"
                   className='rounded-lg h-[4vh] bg-green-500 text-primary'
                   onClick={() => {
                    appendMoreInfo("Tính chất: xyz");}}>
                  add {`(max 10)`} </button>:""}    
                  <p className=' text-aCaption font-title2-caption text-[#FF0000]'>{errors.moreInfo?.message}</p> 
                  </div>
                  {/*  */}
                  <div className=' cont_input   '>
                  <ol className='list-decimal flex flex-col py-[5%] gap-y-[1vh] list-inside'>
                 {option.map((item, index) => {
         
                   return (
                      <li className=' border-2 rounded-sm  h-[60vh] gap-[2vh] flex flex-col justify-between  ' key={item.id}>
                        <label className=' border border-gray-600 rounded-xl' htmlFor="">Tên của phiên bản này:<input className=' rounded-xl pb-[0.875vh] focus:border-primaryBlack  focus:ring-0 w-full  inp' {...register(`option.${index}.style`,{required:"*Đây là trường bắt buộc"})}  /></label>
                       
                       
                       <label className=' border border-gray-600 rounded-xl' htmlFor="">Giá bán của phiên bản này:<input type='number' className=' rounded-xl pb-[0.875vh] focus:border-primaryBlack  focus:ring-0 w-full  inp' {...register(`option.${index}.cost`, {valueAsNumber: true},{required:"*Đây là trường bắt buộc",min:0})} min={0}/></label> 
                        
                       <label className=' border border-gray-600 rounded-xl' htmlFor="">Link ảnh thumbnail của phiên bản này:
                   
                       <input  type={"file"} className=' rounded-xl pb-[0.875vh] focus:border-primaryBlack  focus:ring-0 w-full  inp' {...register(`option.${index}.thumnailPics`,{required:"*Đây là trường bắt buộc"})} />
                       
                       </label> 
                      
                      <label className=' border border-gray-600 rounded-xl' htmlFor="">Số lượng của phiên bản này:<input type='number' className=' rounded-xl pb-[0.875vh] focus:border-primaryBlack  focus:ring-0 w-full  inp' {...register(`option.${index}.number`, {valueAsNumber: true},{required:"*Đây là trường bắt buộc",min:0})} min={0} /></label>  
                       
                        {index <1?"": <button className=' rounded-lg h-[4vh] bg-red-500 text-primary ' type="button" onClick={() => removeOption(index)}>
                          Delete
                        </button>}
                      </li>
                    );
                  })}
                   </ol>
                   {option.length<10?<button
                   type="button"
                   className='rounded-lg h-[4vh] bg-green-500 text-primary'
                   onClick={() => {
                    appendOption({
                      style:"Tên phiên bản",
                      cost:0,
                      thumnailPics:"Hãy dán link của phiên bản này ảnh vào đây",
                      number:0
                    });}}>
                  add {`(max 10)`} </button>:""}    
                  <p className=' text-aCaption font-title2-caption text-[#FF0000]'>{errors.moreInfo?.message}</p> 
                  </div>
                  <div className='    cont_input '>
                    <div>Đặt lên tab mới nhất:</div>
                    <div className=' flex gap-[2rem]   justify-center '>
                      <input type="checkbox" placeholder="isNewest" {...register("isNewest", {})} />
                      {/* <div className='items-center  flex gap-[0.3rem]'>
                        <label htmlFor=""> Yes</label>
                    <input {...register("isNewest", { required: true })} type="radio" value={true} />
                      </div>
                      <div className=' items-center flex gap-[0.3rem]'>
                    <label htmlFor="">No</label>
                    <input {...register("isNewest", { required: true })} type="radio" value={false} />
                 
                      </div> */}
                    </div>
                
                 
                  </div>
                  <div className='    cont_input '>
                    <div>Đặt lên tab bán chạy nhất:</div>
                    <div className=' flex gap-[2rem]   justify-center '>
                    <input type="checkbox" placeholder="" {...register("isBestSeller", {})} />
                      {/* <div className='items-center  flex gap-[0.3rem]'>

                        <label htmlFor=""> Yes</label>
                    <input {...register("isBestSeller", { required: true })} type="radio" value={true} />
                      </div> */}
                      {/* <div className=' items-center flex gap-[0.3rem]'>
                    <label htmlFor="">No</label>
                    <input {...register("isBestSeller", { required: true })} type="radio" value={false} />
                 
                      </div> */}
                    </div>
                
                 
                  </div>
                  {/* <div className='    cont_input '>
                    <div>Đặt lên tab preOder:</div>
                    <div className=' flex gap-[2rem]   justify-center '>
                      <div className='items-center  flex gap-[0.3rem]'>

                        <label htmlFor=""> Yes</label>
                    <input {...register("isPreOrder", { required: true })} type="radio" value="Yes" />
                      </div>
                      <div className=' items-center flex gap-[0.3rem]'>
                    <label htmlFor="">No</label>
                    <input {...register("isPreOrder", { required: true })} type="radio" value="No" />
                 
                      </div>
                    </div>
                
                  <p className=' self-start text-aCaption font-title2-caption text-[#FF0000]'>{errors.cost?.message}</p> 
                  </div> */}
                   <div className='    cont_input '>
                    <div>Có ẩn đi không ?</div>
                    <input type="checkbox" placeholder="isNewest" {...register("isHidden", {})} />
                    {/* <div className=' flex gap-[2rem]   justify-center '>
                      <div className='items-center  flex gap-[0.3rem]'>

                        <label htmlFor=""> Yes</label>
                    <input {...register("isHidden", { required: true })} type="radio" value={true} />
                      </div>
                      <div className=' items-center flex gap-[0.3rem]'>
                    <label htmlFor="">No</label>
                    <input {...register("isHidden", { required: true })} type="radio" value={false} />
                 
                      </div>
                    </div> */}
                
                
                  </div>
                
                  <button  type='submit'   className=' w-fit flex cursor-pointer'> <img className=" ml-[-0.5rem] object-contain h-[2rem] w-[2rem] " src={ "https://live.staticflickr.com/65535/52252454497_7a572f16d1_o.png" } alt="" /> <u className="mt-[0.8rem] font-bold text-[0.875rem]">Thêm mới sản phẩm</u> </button>
              </form>
      </div>
     
    );
  }
}

export default NewProduct;