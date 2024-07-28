'use client';
import { Box, Button, TextArea, TextField } from '@radix-ui/themes';
import React from 'react';

const NewFeedback = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="Name"></TextField.Root>
      <TextArea placeholder="Message"></TextArea>
      <Button>Kirim</Button>
    </div>
  );
};

export default NewFeedback;
