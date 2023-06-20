import React from 'react'
import './ckeditor.scss'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-image/theme/image.css';

ClassicEditor.defaultConfig = {
      toolbar: {
        items: [
          'heading',
          '|',
          'bold',
          'italic',
          '|',
          'bulletedList',
          'numberedList',
        //   '|',
        //   'insertTable',
        //   '|',
        //   'imageUpload',
        //   '|',
          'undo',
          'redo'
        ]
      },
      image: {
        toolbar: [
          'imageStyle:full',
          'imageStyle:side',
          '|',
          'imageTextAlternative'
        ]
      },
      table: {
        contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
      },
      language: 'en'
    };

const CkEditor = () => {
    const removeImagePlugin = (editor) => {
        const imagePlugin = editor.plugins.get('Image');
        if (imagePlugin) {
            editor.plugins.remove('Image');
            editor.commands.delete('image');
            editor.ui.registry.getAll().forEach((item) => {
                if (item.startsWith('image')) {
                    editor.ui.registry.remove(item);
                }
            });
        }
    };
    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        console.log(data);
    };
    
  return (
    <div className="section">
        <div className="container">
              <h4>CKEditor</h4>
              <CKEditor
                  editor={ClassicEditor}
                  config={{
                      removePlugins: [removeImagePlugin],
                  }}
                  onChange={handleEditorChange}
              />
        </div>
    </div>
  )
}

export default CkEditor