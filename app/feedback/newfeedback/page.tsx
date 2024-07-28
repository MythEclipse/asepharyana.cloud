'use client';
import { Box, Button, TextArea, TextField } from '@radix-ui/themes';
import React from 'react';
import 'easymde/dist/easymde.min.css';
import 'simplemde/dist/simplemde.min.css';
import MarkdownEditor from '@/components/MarkdownEditor';

const NewFeedback = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="Nama"></TextField.Root>
      <MarkdownEditor placeholder="Isi Pesan" />
      <Button>Kirim</Button>
    </div>
  );
};

export default NewFeedback;
