import ReadQuillEditor from "../Ultity/ReadOnlyEditor";

function ProductDiscription({item}) {
  return ( 
    <div className="d">
      <ReadQuillEditor  full={true} className=" break-words w-full" value={item.discription}></ReadQuillEditor>
    </div>
   );
}

export default ProductDiscription;