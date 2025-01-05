import 'simplemde/dist/simplemde.min.css';
import React, { useEffect } from 'react';
import SimpleMDE from 'react-simplemde-editor';

type MarkdownEditorProps = {
  placeholder: string;
};

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ placeholder }) => {
  useEffect(() => {
    // Tambahkan kelas CSS untuk mode gelap pada body
    document.body.classList.add('dark-mode');

    return () => {
      document.body.classList.remove('dark-mode');
    };
  }, []);

  return (
    <SimpleMDE
      className='dark:bg-darka dark:text-gray-100'
      options={{
        spellChecker: false, // Menonaktifkan spell checker
        renderingConfig: {
          singleLineBreaks: false,
          codeSyntaxHighlighting: true,
        },
        toolbar: [
          'bold',
          'italic',
          'heading',
          '|',
          'quote',
          'unordered-list',
          'ordered-list',
          '|',
          'link',
          'image',
          'table',
          '|',
          'preview',
          '|',
          'guide',
        ],
      }}
      placeholder={placeholder}
    />
  );
};

export default MarkdownEditor;
