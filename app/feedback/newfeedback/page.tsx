'use client';
import { Button, TextArea, TextField } from '@radix-ui/themes';
import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface FeedbackForm {
  name: string;
  message: string;
}

const NewFeedback = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<FeedbackForm>();
  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        await axios.post('/api/feedback', data);
        router.push('/feedback');
      })}
    >
      <TextField.Root placeholder="Nama" {...register('name')}></TextField.Root>
      <TextArea placeholder="Pesan" {...register('message')}></TextArea>
      <Button>Kirim</Button>
    </form>
  );
};

export default NewFeedback;
