function ProductMoreInfo({item}) {
  return (
    <div className="">
      {item.moreInfo.map((item,i)=>{
        return(
          <div key={i} className="">
            {item}
          </div>
        )
      })}
    </div>
    );
}

export default ProductMoreInfo;