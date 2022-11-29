
import { iconMoney, iconQuantity, toVND } from "../../createInstance";

function ProductOption({item,pic}) {
  return (  

    <div className=" px-2 py-4 " >{
      item.option.map((item2,i)=>{
        return (
          <div key={item2._id} className="">
            <div>{i+1}.{item2.style}:</div>
            <div className=" flex"> {iconMoney("green")}: {toVND(item2.cost)}</div>
            <div className=" flex"> { iconQuantity()}: còn {item2.number} cái</div>
            {pic&&<img className=" w-40 h-40" src={item2?.thumnailPics} alt=""/>}
            {i===item.option.length-1?"":"-----"}
          </div>
        )
      })
    }</div>
  );
}

export default ProductOption;