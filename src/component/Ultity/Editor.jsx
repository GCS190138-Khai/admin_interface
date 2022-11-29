import ReactQuill, { Quill } from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { modules } from "../../createInstance";
import React, { useState } from "react";


import "react-quill/dist/quill.snow.css";
import quillEmoji from "react-quill-emoji";
import "react-quill-emoji/dist/quill-emoji.css";

function QuillEditor({handleDelta,value}) {
 
  Quill.register(
    {
      "formats/emoji": quillEmoji.EmojiBlot,
      "modules/emoji-toolbar": quillEmoji.ToolbarEmoji,
      "modules/emoji-textarea": quillEmoji.TextAreaEmoji,
      "modules/emoji-shortname": quillEmoji.ShortNameEmoji
    },
    true
  );


  return ( 
    <ReactQuill className=" break-words w-full" theme="snow" value={value} onChange={handleDelta}  modules={modules}></ReactQuill>
   );
}

export default QuillEditor;