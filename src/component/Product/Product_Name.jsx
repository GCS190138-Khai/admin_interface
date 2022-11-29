function ProductName({item,status}) {


  let bg = item.isHidden? "bg-red-500" :"bg-green-500"
  return ( 
    <div  className={status?`align-text-top px-2 py-4 w-full ${bg} `:" w-full  align-text-top px-2 py-4 "}>
                   Tên: {item.name}
                    <br></br>
                    --------
                    <br></br>
                    Code:  {item.productCode}
    </div>
   );
}

export default ProductName;