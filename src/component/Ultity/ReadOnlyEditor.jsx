import ReactQuill, { Quill } from "react-quill";
import 'react-quill/dist/quill.bubble.css'

function ReadQuillEditor({value,className,full}) {


  return ( 
    <ReactQuill   className= {full?className:`${className}break-words w-[49.563rem]`} theme="bubble" value={value} readOnly={true}></ReactQuill>
   );
}

export default ReadQuillEditor;