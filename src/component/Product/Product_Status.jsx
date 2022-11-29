import { inconCheckStatus } from "../../createInstance";

function ProductStatus({item}) {
  return ( 
    <div className="d">
      <div className="flex gap-2">Đang được đặt trên tab sản phẩm bán chạy:{inconCheckStatus(item.isBestSeller) }</div>
      <div className="flex gap-2">Đang đc hiển thị:{inconCheckStatus(!item.isHidden)}</div>
      <div className="flex gap-2">Đang được đặt trên tab sản phẩm mới :{inconCheckStatus(item.isNewest)}</div>
      <div className="flex gap-2">Sản phẩm có thể pre-order:{inconCheckStatus(item.isPreOrder)}</div>
    </div>
   );
}

export default ProductStatus;