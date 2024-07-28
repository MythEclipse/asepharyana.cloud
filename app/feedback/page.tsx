import React from 'react';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';

const page = () => {
  return (
    <div>
        <Link href="/feedback/newfeedback"><Button>New Feedback</Button></Link>
    </div>
  );
};

export default page;
