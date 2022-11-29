function TbCell({data,className}) {
  return ( 
    <div className={className?`${className} px-2 py-4 w-full`:"px-2 py-4 w-full"}>{data}</div>
   );
}

export default TbCell;