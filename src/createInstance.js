import axios from "axios"
import { convertToRaw } from "draft-js"


import jwt_decode from "jwt-decode"
import { loginSuccess } from "./redux/authSlice"

import draftToMarkdown from 'draftjs-to-markdown';
import { format, parseISO } from "date-fns"
import { vi } from "date-fns/locale"




  const refreshTonken= async(currentUser)=>{
        try {
          const res = await axios.post(`https://api.phobendoi.art/api/auth/refresh`,currentUser)
      
          return res.data
        } catch (error) {
          console.log(error)
        }
      }
export const createAxios =  (currentUser,dispatch,stateSuccess) =>{
  
    const axiosJWT= axios.create()
   
    axiosJWT.interceptors.request.use(
       
        async(config)=>{
    
          let date = new Date()
        
          const decodedToken =await jwt_decode(currentUser.accessToken)
          
         
          
          
          if(decodedToken.exp*1000 < date.getTime()){
          
             const data = await refreshTonken(currentUser);
            
             const refreshUser =  {
               ...currentUser,
               accessToken: data.accessToken,
               refreshToken: data.refreshToken
              
             }
           dispatch(loginSuccess(refreshUser))
           const accessToken= data.accessToken
             config.headers["token"]= `Bearer ${accessToken}`;
          }
          return config
        },
        (error)=>{
         
          return Promise.reject(error)
        }
      )
     
      return axiosJWT
}
export const toVND = (data) =>{
  return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(data)
}
export const  tobase64=  (element) => {
  
  var file = element[0];
  return new Promise((resolve)=>{
    var reader = new FileReader();
  
  
  reader.onloadend =  ()=> resolve(reader.result)
  reader.readAsDataURL(file);

  })

 
}
export const toHtml = (data)=>{
  const thisNode =draftToMarkdown(convertToRaw(data.getCurrentContent()))

  return thisNode
}

export const toText = (data)=>{
  
    return {__html: data};
  
}
export const URL = "https://api.phobendoi.art/api"
export const  modules={
    toolbar: [
      [{ 'header': [] }, { 'font': [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { 'list': 'ordered' },
        { 'list': 'bullet' },
        { 'indent': '-1' },
        { 'indent': '+1' },
      ],
      ['link', 'image', 'video'],
      ['clean'],
      [{ 'color': [] }, { 'background': [] }],
      [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
      ["emoji"]
      // [],
    ],
    "emoji-toolbar": true,
    "emoji-textarea": true,
    "emoji-shortname": true,
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
    // htmlEditButton,
    // htmlEditButton: {
    //   // logging, default:false
    //   debug: true,

    //   /**
    //    * Custom message to display in the editor, default:
    //    * Edit HTML here, when you click "OK" the quill editor's
    //    * contents will be replaced
    //   */
    //   msg: 'Edit the content in HTML format',

    //   // Text to display in the OK button, default: Ok,
    //   okText: 'Ok',

    //   // Text to display in the cancel button, default: Cancel
    //   cancelText: 'Cancel',

    //   // Text to display in the toolbar button, default: <>
    //   buttonHTML: '&lt;&gt;',

    //   // Text to display as the tooltip for the toolbar button, default: Show HTML source
    //   buttonTitle: 'Show HTML source',

    //   /**
    //    * Show the HTML with syntax highlighting.
    //    * Requires highlightjs on window.hljs (similar to Quill itself), default:
    //    * false
    //   */
    //   syntax: false,

    //   // a string used to select where you want to insert the overlayContainer, default: null (appends to body),
    //   prependSelector: 'div#myelement',
    //   editorModules: {}, // The default mod
    // },
  }
export const iconMoney = (color)=>{
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill={`${color}`} viewBox="0 0 24 24" strokeWidth={1.5} stroke={`${color}`} className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
</svg>

  )
}

export const iconQuantity = (color)=>{
  return (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
</svg>


  )
}

export const toEE_dd_MM_yyyy = (date) =>{
 return format( parseISO(date),"EEEE-dd.MM.yyyy",{locale:vi})
}
export const iconDetail = () =>{
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="Blue" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
</svg>

}
export const iconEdit = () =>{
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
</svg>

}

export const  inconCheckStatus = (check) =>{
      if(check){
        return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      
      }else{
        return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      
      }
}

export const iconRefresh = () =>{
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
</svg>

}
export const iconPackaged = ()=>{
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
</svg>

}
export const iconShipping = () =>{
  return <svg xmlns="http://www.w3.org/2000/svg" fill="red" strokeWidth={1} stroke="red" className=" cursor-pointer w-6 h-6" data-name="Layer 2" viewBox="0 0 35 35"><path d="M25.24 25.31H13.3a1.25 1.25 0 0 1 0-2.5H25.24a1.25 1.25 0 0 1 0 2.5zM32.12 25.31h-.3a1.25 1.25 0 0 1 0-2.5h.3a.62.62 0 0 0 .63-.62V17.9a.63.63 0 0 0-.48-.61H24.9a3.13 3.13 0 0 1-3.13-3.12V7.47a.61.61 0 0 0-.62-.62H6.42a1.25 1.25 0 0 1 0-2.5H21.15a3.12 3.12 0 0 1 3.12 3.12v6.68a.62.62 0 0 0 .63.62h7.22a3.82 3.82 0 0 1 .68.07l.22.07a3.1 3.1 0 0 1 2.23 3v4.29A3.13 3.13 0 0 1 32.12 25.31z"/><path d="M32.55 17.33a1.24 1.24 0 0 1-1.17-.83l-2-5.56a.6.6 0 0 0-.47-.25H23a1.25 1.25 0 0 1 0-2.5h5.91a3.08 3.08 0 0 1 2.7 1.62 1.42 1.42 0 0 1 .08.18l2 5.67a1.26 1.26 0 0 1-.76 1.6A1.54 1.54 0 0 1 32.55 17.33zM28.53 30.65a4.55 4.55 0 1 1 4.55-4.55A4.55 4.55 0 0 1 28.53 30.65zm0-6.6a2.05 2.05 0 1 0 2 2.05A2.05 2.05 0 0 0 28.53 24.05zM10 30.65a4.55 4.55 0 1 1 4.55-4.55A4.55 4.55 0 0 1 10 30.65zm0-6.6a2.05 2.05 0 1 0 2.05 2.05A2.05 2.05 0 0 0 10 24.05z"/><path d="M23 25.31a1.24 1.24 0 0 1-1.25-1.25V13.13a1.25 1.25 0 1 1 2.5 0V24.06A1.24 1.24 0 0 1 23 25.31zM10.19 13.17H2a1.25 1.25 0 0 1 0-2.5h8.19a1.25 1.25 0 0 1 0 2.5zM11.73 18.75H7.45a1.25 1.25 0 1 1 0-2.5h4.28a1.25 1.25 0 0 1 0 2.5z"/></svg>
}
export const iconCheck = ()=>{
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className=" cursor-pointer w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
</svg>

}
export const hotReload = () =>{
  return  window.location.reload(false)
}
