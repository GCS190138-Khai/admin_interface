function ProductPics({item}) {




return(
  <div className=" ">
  {item.pics.map((item,i)=>{
    return ( 
      <div key={item._id}>
        <div>{i+1}.</div>
        <img className="h-80 w-full rounded-lg " src={item} alt="" />
      </div>
     );
  })}
  </div>
)

 
}

export default ProductPics;