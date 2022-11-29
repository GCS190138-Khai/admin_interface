function ProductGenres({item}) {
  return (

    <div className="align-text-top px-2 py-4 ">
    {
         item.genres.map((item2,i)=>{
          return (
            <div key={item2._id} className="">
              <div>{item2.name}</div>
              {i===item.genres.length-1?"":"-----"}
            </div>
          )
        })
    }
  </div>
    );
}

export default ProductGenres;