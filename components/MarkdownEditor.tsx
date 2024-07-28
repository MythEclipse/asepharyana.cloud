import SimpleMDE from 'react-simplemde-editor';

import React from 'react';

type typh = {
  ph: string;
};

const MarkdownEditor = (ph: typh) => {
  return (
    <SimpleMDE
      options={{
        spellChecker: false, // Menonaktifkan spell checker
        renderingConfig: {
          singleLineBreaks: false,
          codeSyntaxHighlighting: true
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
          'guide'
        ]
      }}
      placeholder={ph.ph}
    ></SimpleMDE>
  );
};

export default MarkdownEditor;
