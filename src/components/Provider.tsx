import React from 'react';
import { Toaster } from 'react-hot-toast';

type Props = {
  children: React.ReactNode;
};

function Provider({ children }: Props) {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
}

export default Provider;
