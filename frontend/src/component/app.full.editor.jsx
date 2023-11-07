import 'react-quill/dist/quill.snow.css';
import "react-quill"
import ReactQuill, { Quill } from 'react-quill';
import Delta from 'quill'
import { useEffect, useRef, useState } from 'react';
import '../app/globals.css'
import axiosAuthClient from '@/api/axiosClient';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'
import ImageUploader from "quill-image-uploader";
import ImageResize from 'quill-image-resize'
 
Quill.register('modules/imageResize', ImageResize);
Quill.register("modules/imageUploader", ImageUploader);

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
    'imageBlot',
    'video',
    'code-block'
]
const modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
        ],
        ['link', 'image', 'video'],
        ['clean'],
        ['code-block'],
    ],
    imageResize: {
        displaySize: true
    },
    imageUploader: {
        upload: (file) => {
            return new Promise((resolve, reject) => {
                const formData = new FormData();
                formData.append('file', file)
                console.log(formData)
                const config = {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                    },
                }
                axiosAuthClient.post('/images', formData, config)
                .then((response) => {
                    console.log(response)
                    resolve(
                        response
                    );
                })
                .catch((error) => console.log(error));
            });
        },
    }

    // imageUploader: {
    //     upload: file => {
    //         return new Promise((resolve, reject) => {
    //             const formData = new FormData();
    //             formData.append("image", file);

    //             fetch(
    //                 "https://api.imgbb.com/1/upload?key=d36eb6591370ae7f9089d85875e56b22",
    //                 {
    //                     method: "POST",
    //                     body: formData
    //                 }
    //             )
    //                 .then(response => response.json())
    //                 .then(result => {
    //                     console.log(result);
    //                     resolve(result.data.url);
    //                 })
    //                 .catch(error => {
    //                     // reject("Upload failed");
    //                     // console.error("Error:", error);
    //                     resolve(
    //                         "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/480px-JavaScript-logo.png"
    //                     );
    //                 });
    //         });
    //     }
    // }
}



function MyEditor(props) {
    console.log(props.value)
    return (
        <ReactQuill
            style={{ background: '#fff', color: '#000' }}
            modules={modules}
            formats={formats}
            defaultValue={props.value}
            value={props.value}
            placeholder='Bài viết...'
            theme="snow"
            onChange={(content, delta, source, editor) => {
                props.setValue(editor.getContents())
            }}
        />
    )
}

export default MyEditor
