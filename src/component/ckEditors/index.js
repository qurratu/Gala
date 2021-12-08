import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Api from "../../Api";
// const API_URL = "http://localhost:8081/api/1.0/ckeditor-gallery-upload";


export default function MyEditor({ handleChange, ...props }) {
  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("files", file);
            Api.uploadImg(body)
              .then((res) => {
                resolve({
                  default: res.data.url
                });
              })
              .catch((err) => {
                reject(err);
              });
          });
        });
      }
    };
  }
  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }
  return (
    <div className="App">
      <CKEditor
      
        config={{
          extraPlugins: [uploadPlugin]
        }}
        data={props.defaultdata}
        editor={ClassicEditor}
        onReady={(editor) => {}}
        onBlur={(event, editor) => {}}
        onFocus={(event, editor) => {}}
      
        onChange={(event, editor) => {
          handleChange(editor.getData());
        }}
        // {...props}
      />
    </div>
  );
}