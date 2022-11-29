import { Outlet } from "react-router-dom";
import { useGenres } from "../Product/api";
import Loading from "../Ultity/Loading";
import { error_text } from "../Ultity/text";
import GenresTable from "./Genres_Table";

function Genres() {


  const {data, status,error} = useGenres()
  
  if(status==='loading'){
    return <Loading></Loading>
  }
  if(status==='error'){
    console.log(error)
    return<div>{error_text}</div>
  }
  if(status==='success'){

    return (  
      <div className="div">
        <GenresTable data={data}></GenresTable>
      
      </div>
    );
  }
}

export default Genres;