import CommentDisplay from '@/components/comment/CommentDisplay';
import CommentInput from '@/components/comment/CommentInput';
import React from 'react';

const CommentPage = () => {
  return (
    <>
      <CommentDisplay comments={[]}/>
      <CommentInput />
    </>
  );
};

export default CommentPage;
