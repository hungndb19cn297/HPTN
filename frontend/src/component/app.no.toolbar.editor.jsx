import 'react-quill/dist/quill.snow.css';
import "react-quill"
import ReactQuill from 'react-quill';
import Delta from 'quill'
import { useEffect, useRef, useState } from 'react';
import '../app/globals.css'
import axiosAuthClient from '@/api/axiosClient';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'
import ImageUploader from "quill-image-uploader";
ReactQuill.Quill.register("modules/imageUploader", ImageUploader);

const formats = [
    'header',
    'font',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
    'imageBlot',
    'code-block'
]
const modules = {
    toolbar: null,
    clipboard: {
        matchVisual: false,
    },
    imageUploader: {
        upload: (file) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/480px-JavaScript-logo.png"
                    );
                }, 3500);
            });
        },
    }
}



function EditorNoToolBar(props) {
    return (<ReactQuill placeholder= {props.placeholder} style={{ background: '#fff', color: '#000' }} modules={modules} formats={formats} defaultValue={props.value} theme="snow" onChange={(content, delta, source, editor) => {
        // props.setValue(new QuillDeltaToHtmlConverter(JSON.parse(JSON.stringify(editor.getContents())).ops, {}).convert())
        props.setValue(editor.getContents())
    }
    } />)
}

export default EditorNoToolBar