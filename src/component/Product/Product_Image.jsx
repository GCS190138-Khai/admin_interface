function ProductImage({item}) {
  return ( 

    <div className=" px-2 py-4 ">
      <img className=" " src={item.pics[0]} alt="" />
    </div>
   );
}

export default ProductImage;