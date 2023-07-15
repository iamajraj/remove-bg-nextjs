import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

function Button({ children, ...props }: Props) {
  return (
    <button
      className="w-full py-4 rounded-full border-gray-800 border hover:scale-[1.02] transition-transform active:scale-95 disabled:text-gray-500 disabled:bg-gray-100"
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
